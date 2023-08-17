const { QueryTypes } = require("sequelize");
const db = require("../../Config/DBconfig");
const { counselingModel } = require('../../../models/counseling');
const { toEn } = require('../../utils/index');
const { phoneNumberValidator } = require('../../utils/validators');
const { requestValidator } = require('../../utils/validators');

const addCounseling = async (req, res) => {
  try {
    const { phoneNumber, nickName } = req.body;
    if (phoneNumberValidator(phoneNumber) !== true) throw phoneNumberValidator(phoneNumber);
    const isParamValid = requestValidator(nickName, phoneNumber);
    if (!isParamValid) {
      throw 'لطفا دیتای کامل وارد کنید.'
    }
    const unixTime = Math.floor(Date.now() / 1000);
    await counselingModel.create({
      PHONENUMBER: toEn(phoneNumber),
      NICKNAME: nickName,
      CREATED_AT: unixTime,
      UPDATE_AT: unixTime
    });
    res.send({
      status: 1,
      message: "با موفقیت انجام شد.",
    });
  } catch (error) {
    res.send({
      status: 0,
      message: error,
    });
  }
};
const getCounseling = async (req, res) => {
  let counseling;
  let query =
    'SELECT mariNail_CounselingRequests.ID , mariNail_CounselingRequests.PHONENUMBER , mariNail_CounselingRequests.NICKNAME , mariNail_CounselingRequests.CREATED_AT , mariNail_CallingStates.ID AS "STATE_ID" , mariNail_CallingStates.STATE_NAME FROM mariNail_CounselingRequests LEFT OUTER JOIN mariNail_CallingStates ON mariNail_CounselingRequests.CALLSTATE = mariNail_CallingStates.ID WHERE mariNail_CounselingRequests.DELETED_AT = 0 ORDER BY mariNail_CounselingRequests.CALLSTATE ';
  req.query.type && req.query.type.length >= 1
    ? (query += ` AND mariNail_CounselingRequests.CALLSTATE = ${req.query.type}  `)
    : "";
  query += ' LIMIT 10';
  req.query.offset && req.query.offset >= 1 ? (query += ` OFFSET ${req.query.offset}`) : '';
  counseling = await db.query(query, { type: QueryTypes.SELECT });
  res.send({
    status: 1,
    message: "درخواست مشاوره ها با موفقیت بازگردانده شد.",
    totalCount: counseling.length,
    data: counseling,
  });
};

const changeCounselingCallState = async (req, res) => {
  try {
    let query = `UPDATE mariNail_CounselingRequests SET mariNail_CounselingRequests.CALLSTATE = ${req.query.type} WHERE mariNail_CounselingRequests.ID = ${req.params.id}`;
    counseling = await db.query(query, { type: QueryTypes.UPDATE });
    res.send({
      status: 1,
      message: "با موفقیت انجام شد.",
    });
  } catch (error) {
    res.send({
      status: 0,
      message:"تغیر ناموفق بود."
    })
  }
};

module.exports = {
  addCounseling,
  getCounseling,
  changeCounselingCallState,
};
