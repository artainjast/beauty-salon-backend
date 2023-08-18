var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { userModel } = require('../../../models/user');
const { tokenGenerator } = require('../../utils/auth');
const dashboardLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const user = userName
            ? yield userModel.findOne({
                where: {
                    USERNAME: userName,
                    DELETED_AT: 0
                }
            })
            : null;
        if (user) {
            if (password && user.PASSWORD === password) {
                const token = tokenGenerator(user.id, process.env.DASHBOARD_AUTH_PRIVATE_KEY);
                res.send({
                    status: 1,
                    message: 'با موفقیت وارد شدید.',
                    accessToken: token,
                    user: ({ FULLNAME, USERNAME } = user)
                });
                return;
            }
            res.send({
                status: 0,
                message: 'رمز یا نام کاربری نادرست است.',
            });
            return;
        }
        res.send({
            status: 0,
            message: 'رمز یا نام کاربری نادرست است.'
        });
        return;
    }
    catch (error) {
        res.status(500);
        res.send({
            status: 0,
            message: 'مشکلی در سرویس لاگین وجود آمده است'
        });
    }
});
// Here's the updated implementation with JWT token authentication for the `verify-otp` route:
// POST method for registration with referral system and OTP verification
// router.post('/register', async (req, res) => {
//   try {
//     const { FIRST_NAME, LAST_NAME, PHONE_NUMBER, REFER_CODE } = req.body;
//     if (!FIRST_NAME || !LAST_NAME || !PHONE_NUMBER) {
//       return res.status(400).json({ message: 'First name, last name, and phone number are required' });
//     }
//     const referralCode = Math.random().toString(36).substring(2, 8); // generate referral code
//     const customer = await mariNail_Customers.create({ FIRST_NAME, LAST_NAME, PHONE_NUMBER, CREATED_AT: Date.now(), REFER_CODE: REFER_CODE || referralCode });
//     const otp = Math.floor(100000 + Math.random() * 900000); // generate 6-digit OTP code
//     const otpKey = `otp:${PHONE_NUMBER}`;
//     const client = redis.createClient();
//     const setAsync = promisify(client.setex).bind(client);
//     await setAsync(otpKey, 300, otp); // set OTP code to expire in 5 minutes (300 seconds)
//     const api_key = process.env.KAVENEGAR_API_KEY;
//     const sender = process.env.KAVENEGAR_SENDER;
//     const receptor = PHONE_NUMBER;
//     const message = `Your OTP code is ${otp}. This code will expire in 5 minutes.`;
//     const api = new kavenegar.KavenegarApi(api_key);
//     await api.Send({ message, receptor, sender });
//     res.status(201).json({ message: 'Registration successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// // POST method for OTP verification with JWT token authentication
// router.post('/verify-otp', authenticateToken, async (req, res) => {
//   try {
//     const { PHONE_NUMBER, OTP } = req.body;
//     if (!PHONE_NUMBER || !OTP) {
//       return res.status(400).json({ message: 'Phone number and OTP are required' });
//     }
//     const otpKey = `otp:${PHONE_NUMBER}`;
//     const client = redis.createClient();
//     const getAsync = promisify(client.get).bind(client);
//     const otpCode = await getAsync(otpKey);
//     if (!otpCode) {
//       return res.status(400).json({ message: 'OTP code expired or invalid' });
//     }
//     if (otpCode !== OTP) {
//       return res.status(400).json({ message: 'Incorrect OTP code' });
//     }
//     await client.del(otpKey);
//     const customer = await mariNail_Customers.findOne({ where: { PHONE_NUMBER } });
//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }
//     const token = jwt.sign({ PHONE_NUMBER }, process.env.ACCESS_TOKEN_SECRET);
//     res.status(200).json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// // POST method for referral system
// router.post('/refer', async (req, res) => {
//   try {
//     const { referCode, friendPhoneNumber } = req.body;
//     if (!referCode || !friendPhoneNumber) {
//       return res.status(400).json({ message: 'Invalid data' });
//     }
//     const referrer = await mariNail_Customers.findOne({ where: { REFER_CODE: referCode } });
//     if (!referrer) {
//       return res.status(400).json({ message: 'Invalid referral code' });
//     }
//     const referredCustomer = await mariNail_Customers.findOne({ where: { PHONE_NUMBER: friendPhoneNumber } });
//     if (!referredCustomer) {
//       return res.status(400).json({ message: 'Friend not found' });
//     }
//     referredCustomer.DISCOUNT_CODE = '200000'; // set discount code for referred customer
//     await referredCustomer.save();
//     res.status(200).json({ message: 'Referral successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// // Middleware function to authenticate JWT token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.status(401).json({ message: 'Unauthorized' });
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Forbidden' });
//     req.user = user;
//     next();
//   });
// }
module.exports = {
    dashboardLoginController: dashboardLogin,
};
//# sourceMappingURL=dashboardAuth.js.map