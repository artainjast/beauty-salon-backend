var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const randomstring = require("randomstring");
const redisClient = require('../../Config/Redisconfig');
const { customerModel } = require("../../../models/index");
const { referralModel } = require("../../../models/refral");
const { toEn } = require("../../utils");
const { tokenGenerator } = require('../../utils/auth');
const { Op } = require("sequelize");
const { sendOTP } = require('../../Config/MeliPayamkconfig');
const iranPhoneNumberRegex = /^(\+98|0)?9\d{9}$/;
const registerOrLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    try {
        if (!phoneNumber.match(iranPhoneNumberRegex))
            return res.status(400).json({ message: "شماره معتبر وارد کنید" });
        if (!redisClient.status || redisClient.status === "end") {
            // If not connected, return an error response
            return res.status(500).json({ message: "Redis client is not connected" });
        }
        redisClient.get(toEn(phoneNumber), (err, redisOtpCode) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(500).json({ message: "Internal server error" });
            }
            else {
                const customer = yield customerModel.findOne({ where: { PHONE_NUMBER: toEn(phoneNumber), DELETED_AT: 0 } });
                if (redisOtpCode) {
                    return res.status(400).json({ message: "لطفا ۲ دقیقه بعد منتظر بمانید.", isCodeGenerated: true, isRegister: !customer });
                }
                // Check if the customer exists in the database
                if (!customer) {
                    // If customer not exists, register it .
                    registerCustomer(req, res);
                }
                else {
                    // Generate OTP code
                    setRedisOTP(req, res, false);
                }
            }
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
const verify = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { phoneNumber, otpCode, firstName, lastName, referCode } = req.body;
        if (!otpCode)
            return res.status(400).json({ message: "otp code is not ok" });
        if (!redisClient.status || redisClient.status === "end") {
            // If not connected, return an error response
            return res.status(500).json({ message: "Redis client is not connected" });
        }
        const customer = yield customerModel.findOne({ where: { PHONE_NUMBER: toEn(phoneNumber), DELETED_AT: 0 } });
        if (!customer) {
            verifyRegister(req, res);
        }
        else {
            verifyLogin(req, res, customer.id);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
const verifyRegister = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { phoneNumber, otpCode, firstName, lastName, referCode } = req.body;
        if (!otpCode)
            return res.status(400).json({ message: "otp code is not ok" });
        if (!redisClient.status || redisClient.status === "end") {
            // If not connected, return an error response
            return res.status(500).json({ message: "Redis client is not connected" });
        }
        const customer = yield customerModel.findOne({ where: { PHONE_NUMBER: toEn(phoneNumber), DELETED_AT: 0 } });
        if (customer) {
            return res.status(400).json({
                message: "کاربر وجود دارد",
            });
        }
        ;
        // Retrieve OTP code from Redis and compare with submitted OTP code
        redisClient.get(toEn(phoneNumber), (err, redisOtpCode) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(500).json({ message: "Internal server error" });
            }
            else {
                if (redisOtpCode === otpCode) {
                    let referringCustomer = null;
                    if (referCode) {
                        referringCustomer = yield customerModel.findOne({
                            where: {
                                REFER_CODE: referCode,
                                DELETED_AT: {
                                    [Op.eq]: 0
                                }
                            }
                        });
                    }
                    // Create a new customer with a unique referral code
                    let newCustomer = yield customerModel.create({
                        FIRST_NAME: firstName,
                        LAST_NAME: lastName,
                        PHONE_NUMBER: toEn(phoneNumber),
                        REFER_CODE: randomstring.generate({ length: 6, type: "alphanumeric", capitalization: "lowercase" })
                    });
                    // If there is a referring customer, create a new referral
                    let referralData = null;
                    if (referringCustomer) {
                        referralData = yield referralModel.create({
                            referred_id: newCustomer.id,
                            referrer_id: referringCustomer.id
                        });
                    }
                    // Send a SMS notification to the new customer
                    if (newCustomer) {
                        // const message = firstName + " عزیز به خانواده نیل مری خوش اومدی❤️" + " کد معرفت " + newCustomer.REFER_CODE + "هستش " + "امیدواریم به زودی ببینیمت😍" + " nail-maryi.ir "
                        yield signUpByCustomerSms(phoneNumber, firstName, newCustomer.REFER_CODE);
                    }
                    if (referringCustomer) {
                        // const ReferrerMessage = referringCustomer.FIRST_NAME +  " عزیز " + firstName + " با کد معرفی شما ثبت نام کرد. " + " تخفیفت ثبت شد, منتظرت هستیم🔥" + " nail-maryi.ir "
                        yield refererCustomerSms(referringCustomer.PHONE_NUMBER, referringCustomer.FIRST_NAME, firstName);
                    }
                    const token = tokenGenerator(newCustomer.id, process.env.CLIENT_AUTH_PRIVATE_KEY, true, '48h');
                    return res.status(201).json({
                        message: "Customer registered successfully",
                        accessToken: token,
                    });
                }
                else {
                    res.status(400).json({ message: "Invalid OTP code" });
                }
            }
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
const verifyLogin = (req, res, customerId) => __awaiter(this, void 0, void 0, function* () {
    const { phoneNumber, otpCode } = req.body;
    // Retrieve OTP code from Redis and compare with submitted OTP code
    redisClient.get(toEn(phoneNumber), (err, redisOtpCode) => {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
        }
        if (redisOtpCode === null) {
            res.status(400).json({ message: "لطفا دوباره وارد شوید.", isOtpExpired: true });
        }
        else {
            if (redisOtpCode === otpCode) {
                // Proceed with customer login
                const token = tokenGenerator(customerId, process.env.CLIENT_AUTH_PRIVATE_KEY, true, '48h');
                res.status(200).json({
                    message: "با موفقیت وارد شدی.",
                    accessToken: token
                });
            }
            else {
                res.status(400).json({ message: "Invalid OTP code" });
            }
        }
    });
});
const registerCustomer = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { referCode } = req.body;
    try {
        // Check if the referral code is valid
        let referringCustomer = null;
        if (referCode) {
            referringCustomer = yield customerModel.findOne({
                where: {
                    REFER_CODE: referCode,
                    DELETED_AT: {
                        [Op.eq]: 0
                    }
                }
            });
            if (!referringCustomer) {
                return res.status(400).json({
                    message: "Invalid referral code"
                });
            }
        }
        return setRedisOTP(req, res, true);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
const setRedisOTP = (req, res, isRegister) => {
    const { phoneNumber } = req.body;
    const generatedOtpCode = randomstring.generate({ length: 6, charset: "numeric" });
    redisClient.set(toEn(phoneNumber), generatedOtpCode, "EX", process.env.OTP_EXPIRY_TIME, (err) => {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
        }
        else {
            //sendOTPSMS by below function 
            sendOTP(generatedOtpCode, phoneNumber);
            res.json({ message: "code Generated", isRegister });
        }
    });
};
module.exports = {
    registerOrLogin,
    verify
};
//# sourceMappingURL=clientAuth.js.map