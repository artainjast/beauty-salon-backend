var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Op } = require("sequelize");
const randomstring = require("randomstring");
const { customerModel } = require("@/models/index");
const { toEn } = require('src/models/index');
const { phoneNumberValidator } = require('../../utils/validators');
const { requestValidator } = require('../../utils/validators');
const { customerSignupByAdmin } = require("../../Config/MeliPayamkconfig");
const addCustomer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phoneNumber } = req.body;
        if (phoneNumberValidator(phoneNumber) !== true)
            throw phoneNumberValidator(phoneNumber);
        const isParamValid = requestValidator(firstName, lastName, phoneNumber);
        if (!isParamValid) {
            throw new Error('ورودی ها ناقص است');
        }
        const isNewUser = yield customerModel.findOne({
            where: {
                PHONE_NUMBER: phoneNumber,
                DELETED_AT: 0
            },
        });
        if (isNewUser === null) {
            const referCode = randomstring.generate({ length: 6, type: "alphanumeric", capitalization: "lowercase" });
            const data = yield customerModel.create({
                FIRST_NAME: firstName,
                LAST_NAME: lastName,
                PHONE_NUMBER: toEn(phoneNumber),
                REFER_CODE: referCode,
            });
            if (data.dataValues.id) {
                yield customerSignupByAdmin(phoneNumber, firstName, referCode);
            }
            res.send({
                status: 1,
                message: "ثبت نام مشتری با موفقیت انجام شد.",
            });
            return;
        }
        res.send({
            status: -1,
            message: "این مشتری قبلا ثبت نام شده است.",
        });
        return;
    }
    catch (error) {
        res.status(422).send({
            status: -1,
            message: error ? error : 'مشکلی در سرور,لطفا دوباره تلاش کنید.'
        });
        return;
    }
});
const editCustomer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phoneNumber, id } = req.body;
        const isNewUser = yield customerModel.findOne({
            where: {
                ID: id
            }
        });
        if (isNewUser !== null) {
            yield customerModel.update({
                FIRST_NAME: firstName,
                LAST_NAME: lastName,
                PHONE_NUMBER: phoneNumber,
                UPDATE_AT: Math.floor(Date.now() / 1000)
            }, {
                where: {
                    ID: id
                }
            });
            res.send({
                status: 1,
                message: 'تغیر کاربر با موفقیت انجام شد.'
            });
            return;
        }
        res.send({
            status: -1,
            message: 'کاربری با این نشانه وجود ندارد.'
        });
        return;
    }
    catch (error) {
        res.status = 500;
        res.send({
            status: -1,
            message: 'مشکلی در سرور,لطفا دوباره تلاش کنید.'
        });
        next(error);
        return;
    }
});
const getCustomers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let users;
        const offset = req.query.offset ? Number(req.query.offset) : 0;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const searchText = req.query.text ? req.query.text.trim() : '';
        const whereClause = {
            DELETED_AT: {
                [Op.eq]: 0
            }
        };
        if (searchText.length > 0) {
            whereClause[Op.or] = [
                {
                    PHONE_NUMBER: {
                        [Op.substring]: searchText
                    }
                },
                {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { FIRST_NAME: { [Op.substring]: searchText } },
                                { LAST_NAME: { [Op.substring]: searchText } }
                            ]
                        }
                    ]
                }
            ];
        }
        users = yield customerModel.findAll({
            where: whereClause,
            offset: offset,
            limit: limit
        });
        res.send({
            status: 1,
            message: 'کاربر های مورد نظر یافت شدند.',
            totalCount: users.length,
            data: users
        });
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});
const deleteCustomer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const rowCount = yield customerModel.update({
                DELETED_AT: Math.floor(Date.now() / 1000),
                UPDATE_AT: Math.floor(Date.now() / 1000)
            }, {
                where: {
                    ID: id
                }
            });
            if (rowCount[0]) {
                res.send({
                    status: 1,
                    message: 'حذف کاربر با موفقیت انجام شد.'
                });
                return;
            }
            res.send({
                status: 0,
                message: 'کاربری با شناسه مورد نظر یافت نشد.'
            });
            return;
        }
        res.send({
            status: -1,
            message: 'شناسه کاربری را به درستی وارد کنید.'
        });
    }
    catch (error) {
        res.status = 500;
        res.send({
            status: -1,
            message: 'مشکلی در سرور,لطفا دوباره تلاش کنید.'
        });
        next(error);
        return;
    }
});
module.exports = {
    addCustomer,
    editCustomer,
    getCustomers,
    deleteCustomer,
};
//# sourceMappingURL=customerHandler.js.map