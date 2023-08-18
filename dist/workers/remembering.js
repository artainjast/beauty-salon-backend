var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Op } = require('sequelize');
const { customerModel, receptionModel, receptionServiceModel, subServiceModel } = require('../models');
const { noticeCustomer } = require('../Config/MeliPayamkconfig');
const { sendSMS } = require("../Config/MeliPayamkconfig");
const calculateTime = (day) => {
    return Math.floor(Date.now() / 1000) - Number(day) * 24 * 60 * 60;
};
const getCustomerNoticeData = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const customersData = yield customerModel.findAll({
            include: [
                {
                    model: receptionModel,
                    where: {
                        created_at: {
                            [Op.between]: [time.start, time.end],
                            [Op.not]: 0
                        },
                    },
                    include: [
                        {
                            model: receptionServiceModel,
                            include: [
                                {
                                    model: subServiceModel,
                                    where: {
                                        id: services
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        return customersData;
    }
    catch (error) {
        // tslint:disable-next-line:no-console
        console.error('Error occurred:', error);
    }
});
const rememberNotice = (time, services, serviceName) => __awaiter(this, void 0, void 0, function* () {
    try {
        const customersData = yield getCustomerNoticeData(time, services);
        //send sms to users
        customersData.map((customer) => {
            noticeCustomer(customer.PHONE_NUMBER, customer.FIRST_NAME, serviceName);
        });
    }
    catch (error) {
        // tslint:disable-next-line:no-console
        console.error('Error occurred:', error);
    }
});
//TODO : IT NEED A LOT OF REFACTOR
const noticeTarmimPodr = () => __awaiter(this, void 0, void 0, function* () {
    const unixDay = calculateTime(27);
    const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000;
    rememberNotice({
        start: startUnixTime,
        end: new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
    }, [48], 'ترمیم پودر');
});
const noticeZhelishTabie = () => __awaiter(this, void 0, void 0, function* () {
    const unixDay = calculateTime(20);
    const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000;
    rememberNotice({
        start: startUnixTime,
        end: new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
    }, [51], 'ژلیش ناخن طبیعی');
});
const noticeZhelish = () => __awaiter(this, void 0, void 0, function* () {
    const unixDay = calculateTime(60);
    const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000;
    rememberNotice({
        start: startUnixTime,
        end: new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
    }, [2], 'ژلیش');
});
const noticeTarmimPa = () => __awaiter(this, void 0, void 0, function* () {
    const unixDay = calculateTime(60);
    const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000;
    rememberNotice({
        start: startUnixTime,
        end: new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
    }, [15], 'ترمیم پا');
});
const noticeKashtPa = () => __awaiter(this, void 0, void 0, function* () {
    const unixDay = calculateTime(60);
    const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000;
    rememberNotice({
        start: startUnixTime,
        end: new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
    }, [15], 'کاشت پا');
});
const sendCustomerNotice = () => __awaiter(this, void 0, void 0, function* () {
    noticeTarmimPodr();
    noticeZhelishTabie();
    noticeZhelish();
    noticeTarmimPa();
    noticeKashtPa();
    sendSMS("09033062112", "cronJob worked at 19:01 ");
});
module.exports = {
    sendCustomerNotice
};
//# sourceMappingURL=remembering.js.map