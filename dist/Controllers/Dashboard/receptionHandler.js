var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { QueryTypes } = require("sequelize");
const db = require("../../Config/DBconfig");
const { receptionModel, receptionServiceModel, subServiceModel, customerModel, receptionPaymentModel, customerDiscountsModel, discountModel } = require("../../../models/index");
const { limitQuery } = require('../../utils/queryLimit');
const { requestValidator } = require('../../utils/validators');
const { afterReceptionSMS } = require("../../Config/MeliPayamkconfig");
const { generateReceptionID } = require('../../utils/numbers');
const oldAddReception = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { customerId, description, services, receptionDate = Math.floor(Date.now() / 1000) } = req.body;
        const isParamValid = requestValidator(customerId, services, receptionDate);
        if (!isParamValid) {
            throw new Error('ورودی ها ناقص است');
        }
        const customer = yield customerModel.findOne({
            where: {
                ID: customerId,
            },
        });
        if (!customer.id) {
            throw new Error('کاربر وجود ندارد');
        }
        if (services && services.length >= 1) {
            let query = `SELECT PRICE FROM mariNail_SubServices WHERE`;
            services.map((item, index) => {
                query += ` ID = ${item.id} ${index !== services.length - 1 ? 'OR' : ''} `;
            });
            const servicePrices = yield db.query(query, { type: QueryTypes.SELECT });
            let totalPrice = 0;
            servicePrices.map((item) => {
                let test = totalPrice + item.PRICE;
                totalPrice = test;
            });
            if (totalPrice === 0) {
                res.send({
                    status: 0,
                    message: 'سرویس های انتخاب شده ناقص است.'
                });
            }
            const unixTime = Math.floor(Date.now() / 1000);
            const data = yield receptionModel.create({
                CUSTOMER_ID: customerId,
                PRICE: totalPrice,
                DESCRIPTION: description.length ? description : null,
                CREATED_AT: receptionDate ? receptionDate : unixTime,
                UPDATED_AT: receptionDate ? receptionDate : unixTime
            });
            if (data.dataValues.id) {
                const servicesIdSet = [...new Set(services)];
                servicesIdSet.map((item) => __awaiter(this, void 0, void 0, function* () {
                    yield receptionServiceModel.create({
                        RECEPTION_ID: data.dataValues.id,
                        SUB_SERVICE_ID: item.id
                    });
                }));
                res.send({
                    status: 1,
                    message: 'پذیرش با موفقیت ثبت شد.'
                });
                yield afterReceptionSMS(customer.PHONE_NUMBER, customer.FIRST_NAME ? customer.FIRST_NAME : customer.LAST_NAME);
                return;
            }
            res.send({
                status: 1,
                message: 'پذیرش با موفقیت ثبت نشد.'
            });
            return;
        }
        res.send({
            status: -1,
            message: "خدمات الزامی است.",
        });
        return;
    }
    catch (error) {
        res.status(422).send({
            status: -1,
            message: error ? error : 'مشکلی در سرور,لطفا دوباره تلاش کنید.'
        });
    }
});
// const addReception = async (req, res, next) => {
//   console.log('reach here');
//   try {
//     const { customerId, description, services, receptionDate = Math.floor(Date.now() / 1000), payments } = req.body;
//     const isParamValid = requestValidator(customerId, services, receptionDate);
//     if (!isParamValid) {
//       throw 'ورودی ها ناقص است';
//     }
//     const customer = await customerModel.findOne({
//       where: {
//         ID: customerId,
//         deleted_at: 0
//       },
//     });
//     if (!customer.id) {
//       throw 'کاربر وجود ندارد'
//     }
//     if (services && services.length >= 1) {
//       console.log('reach services');
//       const servicePrices = await subServiceModel.findAll({
//         where: {
//           id: services.map(service => service.id)
//         },
//         attributes: ['PRICE']
//       });
//       let totalPrice = servicePrices.reduce((sum, item) => sum + item.PRICE, 0);
//       console.log("it's total price " + totalPrice);
//       if (totalPrice === 0) {
//         res.send({
//           status: 0,
//           message: 'سرویس های انتخاب شده ناقص است.'
//         });
//         return;
//       }
//       const unixTime = Math.floor(Date.now() / 1000);
//       const reception = await receptionModel.create({
//         CUSTOMER_ID: customerId,
//         PRICE: totalPrice,
//         DESCRIPTION: description.length ? description : null,
//         CREATED_AT: receptionDate ? receptionDate : unixTime,
//         UPDATED_AT: receptionDate ? receptionDate : unixTime
//       });
//       if (reception.dataValues.id) {
//         console.log(reception.dataValues.id);
//         if (payments && payments.length >= 1) {
//           console.log(payments);
//           const totalPayment = payments.reduce((sum, payment) => sum + payment.amount, 0);
//           console.log("it's total payment " + totalPayment);
//           if (totalPrice !== totalPayment) {
//             res.send({
//               status: 0,
//               message: 'مبلغ پرداختی با قیمت کل سرویس‌ها مطابقت ندارد.'
//             });
//             return;
//           }
//           await receptionModel.addPaymentTypes(payments.map(payment => payment.paymentType.id), { through: { amount: payment.amount } });
//         }
//         else {
//           res.send({
//             status: 0,
//             message: 'ورودی های مبلغ دریافتی کامل نیست.'
//           });
//           return;
//         }
//         services.forEach(async (service) => {
//           await receptionServiceModel.create({
//             RECEPTION_ID: reception.dataValues.id,
//             SUB_SERVICE_ID: service.id
//           });
//         });
//         res.send({
//           status: 1,
//           message: 'پذیرش با موفقیت ثبت شد.'
//         });
//         await afterReceptionSMS(customer.PHONE_NUMBER, customer.FIRST_NAME ? customer.FIRST_NAME : customer.LAST_NAME);
//         return;
//       }
//       res.send({
//         status: 1,
//         message: 'پذیرش با موفقیت ثبت نشد.'
//       });
//       return;
//     }
//     res.send({
//       status: -1,
//       message: "خدمات الزامی است.",
//     });
//     return;
//   } catch (error) {
//     res.status(422).send({
//       status: -1,
//       message: error ? error : 'مشکلی در سرور، لطفاً دوباره تلاش کنید.'
//     });
//   }
// };
//it does 'not' change service of a reception
//it's not complete
const addReception = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { customerId, description, services, receptionDate = Math.floor(Date.now() / 1000), payments, discountCode } = req.body;
        const isParamValid = requestValidator(customerId, services, receptionDate, payments);
        if (!isParamValid) {
            throw new Error('ورودی ها ناقص است');
        }
        const customer = yield customerModel.findOne({
            where: {
                ID: customerId,
                deleted_at: 0
            },
        });
        if (!customer.id) {
            throw new Error('کاربر وجود ندارد');
        }
        if (services && services.length >= 1) {
            const servicePrices = yield subServiceModel.findAll({
                where: {
                    id: services.map(service => service.id)
                },
                attributes: ['PRICE']
            });
            let totalPrice = servicePrices.reduce((sum, item) => sum + item.PRICE, 0);
            if (totalPrice === 0) {
                res.send({
                    status: 0,
                    message: 'سرویس های انتخاب شده ناقص است.'
                });
                return;
            }
            let discountAmount = 0;
            let selectedDiscount;
            if (discountCode) {
                const discount = yield discountModel.findOne({
                    where: {
                        voucherCode: discountCode,
                    }
                });
                if (discount) {
                    selectedDiscount = yield customerDiscountsModel.findOne({
                        where: {
                            customerId,
                            discountId: discount.id,
                            is_used: false,
                        }
                    });
                    if (selectedDiscount) {
                        if (discount.type === 'percentage') {
                            discountAmount = (discount.amount / 100) * totalPrice;
                        }
                        else {
                            discountAmount = discount.amount;
                        }
                        selectedDiscount.is_used = true;
                    }
                    else {
                        res.send({
                            status: 0,
                            message: 'کد تخفیفی برای این مشتری با این کد وجود ندارد.'
                        });
                        return;
                    }
                }
                else {
                    res.send({
                        status: 0,
                        message: 'کد تخفیفی با این کد وجود ندارد.'
                    });
                    return;
                }
            }
            const discountedPrice = totalPrice - discountAmount;
            const unixTime = Math.floor(Date.now() / 1000);
            const receptionID = generateReceptionID();
            const reception = yield receptionModel.create({
                receptionID,
                CUSTOMER_ID: customerId,
                PRICE: discountedPrice,
                DESCRIPTION: description.length ? description : null,
                CREATED_AT: receptionDate ? receptionDate : unixTime,
                UPDATED_AT: receptionDate ? receptionDate : unixTime
            });
            if (reception.dataValues.id) {
                if (payments && payments.length >= 1) {
                    const totalPayment = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
                    if (discountedPrice < totalPayment) {
                        yield reception.update({ DELETED_AT: unixTime });
                        if (discountCode) {
                            yield selectedDiscount.update({ is_used: 0 });
                        }
                        res.send({
                            status: 0,
                            message: 'مبلغ پرداختی با بیشتر از جمع فاکتور است.'
                        });
                        return;
                    }
                    if (discountedPrice > totalPayment) {
                        yield reception.update({ DELETED_AT: unixTime });
                        if (discountCode) {
                            yield selectedDiscount.update({ is_used: 0 });
                        }
                        res.send({
                            status: 0,
                            message: 'مبلغ پرداختی با قیمت کل سرویس‌ها مطابقت ندارد.'
                        });
                        return;
                    }
                    yield Promise.all(payments.map((payment) => __awaiter(this, void 0, void 0, function* () {
                        yield receptionPaymentModel.create({
                            reception_id: reception.id,
                            payment_type_id: +payment.paymentType,
                            amount: +payment.amount
                        });
                    })));
                }
                else {
                    yield reception.update({ DELETED_AT: unixTime });
                    if (discountCode) {
                        yield selectedDiscount.update({ is_used: 0 });
                    }
                    res.send({
                        status: 0,
                        message: 'ورودی های مبلغ دریافتی کامل نیست.'
                    });
                    return;
                }
                yield Promise.all(services.map((service) => __awaiter(this, void 0, void 0, function* () {
                    yield receptionServiceModel.create({
                        RECEPTION_ID: reception.dataValues.id,
                        SUB_SERVICE_ID: service.id
                    });
                })));
                if (selectedDiscount) {
                    selectedDiscount.receptionId = reception.id; // Update reception ID in customerDiscount
                    yield selectedDiscount.save();
                }
                res.send({
                    status: 1,
                    message: 'پذیرش با موفقیت ثبت شد.'
                });
                yield afterReceptionSMS(customer.PHONE_NUMBER, customer.FIRST_NAME ? customer.FIRST_NAME : customer.LAST_NAME);
                return;
            }
            res.send({
                status: 1,
                message: 'پذیرش با موفقیت ثبت نشد.'
            });
            return;
        }
        res.send({
            status: -1,
            message: "خدمات الزامی است.",
        });
        return;
    }
    catch (error) {
        res.status(422).send({
            error: error,
            status: -1,
            message: error ? error : 'مشکلی در سرور، لطفاً دوباره تلاش کنید.'
        });
    }
});
const editReception = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id, userId, price, description } = req.body;
        const isNewUser = yield receptionModel.findOne({
            where: {
                ID: id,
            },
        });
        if (isNewUser !== null) {
            const data = yield receptionModel.update({
                USER_ID: userId,
                PRICE: price,
                DESCRIPTION: description.length ? description : null,
                UPDATE_AT: Math.floor(Date.now() / 1000),
            }, {
                where: {
                    ID: id,
                },
            });
            res.send({
                status: 1,
                message: "تغیر پذیرش با موفقیت انجام شد.",
            });
            return;
        }
        res.send({
            status: -1,
            message: "پذیرشی با این نشانه وجود ندارد.",
        });
        return;
    }
    catch (error) {
        res.send({
            status: 0,
            message: 'مشکلی پیش آمده است.'
        });
    }
});
const deleteReception = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const rowCount = yield receptionModel.update({
                DELETED_AT: Math.floor(Date.now() / 1000),
                UPDATE_AT: Math.floor(Date.now() / 1000),
            }, {
                where: {
                    ID: id,
                },
            });
            if (rowCount[0]) {
                res.send({
                    status: 1,
                    message: "حذف پذیرش با موفقیت انجام شد.",
                });
                return;
            }
            res.send({
                status: 0,
                message: "پذیرشی با شناسه مورد نظر یافت نشد.",
            });
            return;
        }
        //   }
        res.send({
            status: -1,
            message: "شناسه پذیرش را به درستی وارد کنید.",
        });
        // return;
    }
    catch (error) {
        res.status = 500;
        res.send({
            status: -1,
            message: "مشکلی در سرور,لطفا دوباره تلاش کنید.",
        });
        next(error);
        return;
    }
});
const getReception = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        // let query =
        //   "SELECT mariNail_Receptions.id, mariNail_Receptions.CUSTOMER_ID, mariNail_Receptions.PRICE, mariNail_Receptions.DESCRIPTION, mariNail_Receptions.CREATED_AT, mariNail_Customers.FIRST_NAME AS 'FIRST_NAME', mariNail_Customers.LAST_NAME AS 'LAST_NAME', mariNail_Customers.PHONE_NUMBER AS 'PHONE_NUMBER' , mariNail_SubServices.NAME FROM mariNail_Receptions AS mariNail_Receptions LEFT OUTER JOIN mariNail_Customers AS mariNail_Customers ON mariNail_Receptions.CUSTOMER_ID = mariNail_Customers.ID LEFT OUTER JOIN mariNail_Receptions_services ON mariNail_Receptions.ID = mariNail_Receptions_services.RECEPTION_ID LEFT OUTER JOIN mariNail_SubServices ON mariNail_Receptions_services.SUB_SERVICE_ID = mariNail_SubServices.ID WHERE (mariNail_Receptions.DELETED_AT = 0) ORDER BY CREATED_AT ASC";
        let query = 'SELECT mariNail_Receptions.id, mariNail_Receptions.PRICE, mariNail_Receptions.DESCRIPTION, mariNail_Receptions.CREATED_AT from mariNail_Receptions WHERE (mariNail_Receptions.DELETED_AT = 0) ORDER BY CREATED_AT DESC';
        let reception;
        //text filtering in firstName , lastName and phoneNumber
        if (req.query.text && req.query.text.length > 0) {
            const text = req.query.text;
            query += ` AND (mariNail_User.PHONE_NUMBER LIKE '%${text}%' OR mariNail_User.FIRST_NAME LIKE '%${text}%' OR mariNail_User.LAST_NAME LIKE '%${text}%') AND (mariNail_User.DELETED_AT = 0) `;
        }
        //from date filtering
        if (req.query.from_date && req.query.from_date.length > 0) {
            let fromDate = req.query.from_date;
            //below conditon just work for (en-US) time
            // if (fromDate.indexOf("/") !== -1 || fromDate.indexOf(".") !== -1 ) {
            //   fromDate.length === 10 ? fromDate = parseInt((new Date(fromDate).getTime() / 1000).toFixed(0)) : ''
            // }
            query += ` AND mariNail_Receptions.CREATED_AT >= ${fromDate}`;
        }
        //to date filtering
        if (req.query.to_date && req.query.to_date.length > 0) {
            let toDate = req.query.to_date;
            //below conditon just work for (en-US) time
            // if (fromDate.indexOf("/") !== -1 || fromDate.indexOf(".") !== -1 ) {
            //   fromDate.length === 10 ? fromDate = parseInt((new Date(fromDate).getTime() / 1000).toFixed(0)) : ''
            // }
            query += ` AND mariNail_Receptions.CREATED_AT <= ${toDate}`;
        }
        query = limitQuery(query, req.query.limit, req.query.offset);
        reception = yield db.query(query, { type: QueryTypes.SELECT });
        res.send({
            status: 1,
            message: 'پذیرش های مورد نظر یافت شدند.',
            totalCount: reception.length,
            data: reception
        });
    }
    catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
});
const getSpecificReception = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let getReceptionQuery = `SELECT ID ,PRICE , DESCRIPTION , CUSTOMER_ID , CREATED_AT FROM mariNail_Receptions WHERE (DELETED_AT = 0 AND ID=${id} )`;
        const [reception] = yield db.query(getReceptionQuery, { type: QueryTypes.SELECT });
        let getCustomerDetail = `SELECT FIRST_NAME , LAST_NAME , PHONE_NUMBER FROM mariNail_Customers WHERE (DELETED_AT = 0 AND ID=${reception.CUSTOMER_ID} )`;
        const [customer] = yield db.query(getCustomerDetail, { type: QueryTypes.SELECT });
        let getReceptionService = `SELECT * FROM mariNail_Receptions_services WHERE mariNail_Receptions_services.RECEPTION_ID = ${reception.ID}`;
        const receptionService = yield db.query(getReceptionService, { type: QueryTypes.SELECT });
        let getSubService = `SELECT * FROM mariNail_SubServices WHERE `;
        receptionService.map((item, index) => {
            const query = ` ID = ${item.SUB_SERVICE_ID} ${index !== receptionService.length - 1 ? ' OR' : ''}`;
            getSubService += query;
        });
        const subServices = yield db.query(getSubService, { type: QueryTypes.SELECT });
        res.send({
            status: 1,
            message: 'اطلاعات پذیرش با موفقیت دریافت شد.',
            data: {
                reception,
                subServices,
                customer
            }
        });
    }
    catch (error) {
        res.status = 500;
        res.send({
            status: -1,
            message: "مشکلی در سرور,لطفا دوباره تلاش کنید.",
        });
        next(error);
        return;
    }
});
const getUserReceptions = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { customerId } = req.user;
    try {
        // const receptions = await receptionModel.findAll({
        //   where: {
        //     CUSTOMER_ID: decoded.userId,
        //     DELETED_AT: 0
        //   }}
        // )
        const receptions = yield receptionModel.findAll({
            where: {
                CUSTOMER_ID: customerId,
                DELETED_AT: 0
            },
            include: [{
                    model: receptionServiceModel,
                    include: [{
                            model: subServiceModel
                        }]
                }]
        });
        const formattedReceptions = receptions.map((reception) => {
            const services = reception.mariNail_Receptions_services.map((service) => {
                return {
                    id: service.dataValues.mariNail_SubService.dataValues.id,
                    NAME: service.dataValues.mariNail_SubService.dataValues.NAME
                };
            });
            return {
                id: reception.id,
                CREATED_AT: reception.CREATED_AT,
                PRICE: reception.PRICE,
                // description : reception.DESCRIPTION,
                services
            };
        });
        return res.status(200).json({
            receptions: formattedReceptions
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = {
    addReception,
    oldAddReception,
    editReception,
    deleteReception,
    getReception,
    getSpecificReception,
    getUserReceptions
};
// i got this error mariNail_Receptions_services is not associated to mariNail_Receptions! ,  i think we need to change model 
//# sourceMappingURL=receptionHandler.js.map