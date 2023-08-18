var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { paymentTypeModel } = require('../../../models/paymentType');
// Create a payment type
const createPaymentType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const unixTime = Math.floor(Date.now() / 1000);
        const paymentType = yield paymentTypeModel.create({ name, created_at: unixTime, updated_at: unixTime });
        res.status(200).json({
            status: 1,
            message: 'Payment type created successfully',
            data: paymentType
        });
    }
    catch (error) {
        res.status(500).json({
            status: -1,
            message: 'Failed to create payment type',
            error: error.message
        });
    }
});
// Get all payment types
const getAllPaymentTypes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const paymentTypes = yield paymentTypeModel.findAll({
            where: {
                deleted_at: 0
            }
        });
        res.status(200).json({
            status: 1,
            message: 'Payment types retrieved successfully',
            data: paymentTypes
        });
    }
    catch (error) {
        res.status(500).json({
            status: -1,
            message: 'Failed to retrieve payment types',
            error: error.message
        });
    }
});
// Get a specific payment type by ID
const getPaymentTypeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const paymentType = yield paymentTypeModel.findOne({
            where: {
                id,
                deleted_at: 0
            }
        });
        if (!paymentType) {
            throw new Error('Payment type not found');
        }
        res.status(200).json({
            status: 1,
            message: 'Payment type retrieved successfully',
            data: paymentType
        });
    }
    catch (error) {
        res.status(500).json({
            status: -1,
            message: 'Failed to retrieve payment type',
            error: error.message
        });
    }
});
// Update a payment type
const updatePaymentType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const unixTime = Math.floor(Date.now() / 1000);
        const paymentType = yield paymentTypeModel.findOne({
            where: {
                id,
                deleted_at: 0
            }
        });
        if (!paymentType) {
            throw new Error('Payment type not found');
        }
        yield paymentType.update({ name, updated_at: unixTime });
        res.status(200).json({
            status: 1,
            message: 'Payment type updated successfully',
            data: paymentType
        });
    }
    catch (error) {
        res.status(500).json({
            status: -1,
            message: 'Failed to update payment type',
            error: error.message
        });
    }
});
// Delete a payment type
const deletePaymentType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const unixTime = Math.floor(Date.now() / 1000);
        const paymentType = yield paymentTypeModel.findOne({
            where: {
                id,
                deleted_at: 0
            }
        });
        if (!paymentType) {
            throw new Error('Payment type not found');
        }
        yield paymentType.update({ deleted_at: unixTime });
        res.status(200).json({
            status: 1,
            message: 'Payment type deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            status: -1,
            message: 'Failed to delete payment type',
            error: error.message
        });
    }
});
module.exports = {
    createPaymentType,
    getAllPaymentTypes,
    getPaymentTypeById,
    updatePaymentType,
    deletePaymentType
};
//# sourceMappingURL=paymentTypeHandler.js.map