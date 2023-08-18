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
const { mainServiceModel } = require("../../../models/mainService");
const getMainServices = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var _a;
    try {
        let services;
        let query = `SELECT id, NAME FROM mariNail_Services AS mariNail_Services WHERE mariNail_Services.DELETED_AT = 0`;
        if (req.query.text && ((_a = req.query.text) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            query += ` AND mariNail_Services.NAME LIKE '%${req.query.text}%' `;
        }
        services = yield db.query(query, { type: QueryTypes.SELECT });
        res.send({
            status: 1,
            message: "سرویس های مورد نظر یافت شد.",
            totalCount: services.length,
            data: services,
        });
    }
    catch (error) {
        res.send({
            status: 0,
            message: "سرویسی یافت نشد",
        });
    }
});
const addMainService = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const mainServiceName = req.body;
        const test = yield mainServiceModel.create({
            NAME: mainServiceName,
        });
    }
    catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
});
module.exports = {
    getMainServices,
    addMainService,
};
//# sourceMappingURL=mainServiceHandler.js.map