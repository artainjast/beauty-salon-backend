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
const { counselingModel } = require('../../../models/counseling');
const { toEn } = require('../../utils/index');
const { phoneNumberValidator } = require('../../utils/validators');
const { requestValidator } = require('../../utils/validators');
const addCounseling = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { phoneNumber, nickName } = req.body;
        if (phoneNumberValidator(phoneNumber) !== true)
            throw phoneNumberValidator(phoneNumber);
        const isParamValid = requestValidator(nickName, phoneNumber);
        if (!isParamValid) {
            throw new Error('لطفا دیتای کامل وارد کنید.');
        }
        const unixTime = Math.floor(Date.now() / 1000);
        yield counselingModel.create({
            PHONENUMBER: toEn(phoneNumber),
            NICKNAME: nickName,
            CREATED_AT: unixTime,
            UPDATE_AT: unixTime
        });
        res.send({
            status: 1,
            message: "با موفقیت انجام شد.",
        });
    }
    catch (error) {
        res.send({
            status: 0,
            message: error,
        });
    }
});
const getCounseling = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let counseling;
    let query = 'SELECT mariNail_CounselingRequests.ID , mariNail_CounselingRequests.PHONENUMBER , mariNail_CounselingRequests.NICKNAME , mariNail_CounselingRequests.CREATED_AT , mariNail_CallingStates.ID AS "STATE_ID" , mariNail_CallingStates.STATE_NAME FROM mariNail_CounselingRequests LEFT OUTER JOIN mariNail_CallingStates ON mariNail_CounselingRequests.CALLSTATE = mariNail_CallingStates.ID WHERE mariNail_CounselingRequests.DELETED_AT = 0 ORDER BY mariNail_CounselingRequests.CALLSTATE ';
    if (req.query.type && req.query.type.length >= 1) {
        query += ` AND mariNail_CounselingRequests.CALLSTATE = ${req.query.type} `;
    }
    query += ' LIMIT 10';
    if (req.query.offset && req.query.offset >= 1) {
        query += ` OFFSET ${req.query.offset}`;
    }
    counseling = yield db.query(query, { type: QueryTypes.SELECT });
    res.send({
        status: 1,
        message: "درخواست مشاوره ها با موفقیت بازگردانده شد.",
        totalCount: counseling.length,
        data: counseling,
    });
});
const changeCounselingCallState = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let query = `UPDATE mariNail_CounselingRequests SET mariNail_CounselingRequests.CALLSTATE = ${req.query.type} WHERE mariNail_CounselingRequests.ID = ${req.params.id}`;
        counseling = yield db.query(query, { type: QueryTypes.UPDATE });
        res.send({
            status: 1,
            message: "با موفقیت انجام شد.",
        });
    }
    catch (error) {
        res.send({
            status: 0,
            message: "تغیر ناموفق بود."
        });
    }
});
module.exports = {
    addCounseling,
    getCounseling,
    changeCounselingCallState,
};
//# sourceMappingURL=counselingHandler.js.map