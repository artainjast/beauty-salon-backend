const { QueryTypes } = require("sequelize");
const db = require("../../Config/DBconfig");
const { mainServiceModel } = require("../../models/mainService");

const getMainServices = async (req, res, next) => {
  try {
    let services;
    let query = `SELECT id, NAME FROM mariNail_Services AS mariNail_Services WHERE mariNail_Services.DELETED_AT = 0`;
    req.query.text && req.query.text.length > 0
      ? (query += ` AND mariNail_Services.NAME LIKE '%${req.query.text}%' `)
      : "";
    services = await db.query(query, { type: QueryTypes.SELECT });
    res.send({
      status: 1,
      message: "سرویس های مورد نظر یافت شد.",
      totalCount: services.length,
      data: services,
    });
  } catch (error) {}
};


const addMainService = async (req , res) => {
  try {
    const mainServiceName =  req.body
    const test = await mainServiceModel.create({
      NAME: mainServiceName,
    });
    console.log(test);
  } catch (error) {
    
  }

};
module.exports = {
  getMainServices,
  addMainService,
};
