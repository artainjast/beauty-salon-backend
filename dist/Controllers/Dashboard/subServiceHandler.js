var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { subServiceModel } = require('../../../models/index');
const { requestValidator } = require('../../utils/validators');
const getSubService = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { text, limit, offset } = req.query;
        // Build the query conditions
        const whereCondition = {
            DELETED_AT: 0,
            is_active: 1
        };
        if (text && text.length > 0) {
            whereCondition.NAME = {
                [Op.like]: `%${text}%`,
            };
        }
        // Parse limit and offset as integers
        const parsedLimit = limit ? Number(limit) : undefined;
        const parsedOffset = offset ? Number(offset) : undefined;
        // Query the sub-services using Sequelize
        const subServices = yield subServiceModel.findAll({
            attributes: ["id", "NAME", "PRICE", "is_active"],
            where: whereCondition,
            limit: parsedLimit,
            offset: parsedOffset,
        });
        res.send({
            status: 1,
            message: "سرویس های مورد نظر یافت شد.",
            totalCount: subServices.length,
            data: subServices,
        });
    }
    catch (error) {
        res.send({ error });
    }
});
const getSubServiceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the sub-service by its ID
        const subService = yield subServiceModel.findByPk(id);
        if (!subService) {
            // Handle the case where the sub-service is not found
            return res.status(404).json({ error: "Sub-service not found" });
        }
        res.send({
            status: 1,
            message: "سرویس مورد نظر یافت شد.",
            data: subService,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get sub-service" });
    }
});
//it just has default mainService id as 1
const addSubService = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { price, name } = req.body;
        const isParamValid = requestValidator(price, name);
        if (!isParamValid) {
            throw new Error('ورودی ها ناقص است');
        }
        const unixTime = Math.floor(Date.now() / 1000);
        yield subServiceModel.create({
            NAME: name,
            MAIN_SERVICE_ID: 1,
            PRICE: price,
            is_active: 1,
            CREATED_AT: unixTime,
            UPDATE_AT: unixTime
        });
        res.send({
            status: 1,
            message: 'سرویس فرعی افزوده شد.'
        });
    }
    catch (error) {
        res.send({
            status: 0,
            message: error ? error : 'سرویس فرعی افزوده نشد'
        });
    }
});
const updateSubService = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const subServiceId = req.params.id;
    const updatedData = req.body;
    try {
        // Update the sub-service
        // Find the sub-service record by ID
        const subService = yield subServiceModel.findByPk(subServiceId);
        if (!subService) {
            // Handle the case where the sub-service is not found
            throw new Error("Sub-service not found");
        }
        // Update the sub-service record with the updated data
        yield subService.update(updatedData);
        // Return the updated sub-service
        res.send({
            status: 1,
            message: 'با موفقیت انجام شد.'
        });
    }
    catch (error) {
        // Handle any errors that occur during the update process
        // tslint:disable-next-line:no-console
        console.error("Error updating sub-service:", error.message);
        throw error;
    }
});
// const deleteSubService = () => { };
module.exports = {
    getSubService,
    getSubServiceById,
    addSubService,
    updateSubService,
    deleteSubService
};
//# sourceMappingURL=subServiceHandler.js.map