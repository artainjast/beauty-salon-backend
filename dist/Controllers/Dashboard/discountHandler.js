var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { discountModel } = require('../../../models/index');
const randomstring = require("randomstring");
// Create a discount
const createDiscount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { amount, type } = req.body;
        const voucherCode = randomstring.generate({ length: 6, type: "alphanumeric", capitalization: "lowercase" });
        const unixTime = Math.floor(Date.now() / 1000);
        // Validate the request body
        if (!voucherCode || !amount || !type) {
            res.status(400).json({ message: 'Invalid request body' });
            return;
        }
        // Create the discount
        const discount = yield discountModel.create({
            voucherCode,
            amount,
            type,
            created_at: unixTime,
            updated_at: unixTime
        });
        res.status(201).json(discount);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create discount', error });
    }
});
// Get all discounts
const getAllDiscounts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const discounts = yield discountModel.findAll();
        res.status(200).json(discounts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve discounts', error });
    }
});
// Get a discount by ID
const getDiscountById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const discount = yield discountModel.findByPk(id);
        if (!discount) {
            res.status(404).json({ message: 'Discount not found' });
            return;
        }
        res.status(200).json(discount);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve discount', error });
    }
});
const checkVoucherCode = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { voucherCode } = req.params;
        // Retrieve the discount based on the voucher code
        const discount = yield discountModel.findOne({
            where: {
                voucherCode: voucherCode,
            },
        });
        if (!discount) {
            // Discount not found
            res.status(404).json({ status: 0, message: 'Voucher code not found' });
            return;
        }
        // Return the discount amount
        res.status(200).json({
            status: 1,
            data: [
                {
                    amount: discount.amount,
                    type: discount.type
                }
            ],
            message: 'کد تخفیف با موفقیت پیدا شد.'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve voucher code', error });
    }
});
// Update a discount
const updateDiscount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { voucherCode, amount, amountType } = req.body;
        // Validate the request body
        if (!voucherCode || !amount || !amountType) {
            res.status(400).json({ message: 'Invalid request body' });
            return;
        }
        // Update the discount
        const discount = yield discountModel.findByPk(id);
        if (!discount) {
            res.status(404).json({ message: 'Discount not found' });
            return;
        }
        discount.voucherCode = voucherCode;
        discount.amount = amount;
        discount.amountType = amountType;
        yield discount.save();
        res.status(200).json(discount);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update discount', error });
    }
});
// Delete a discount
const deleteDiscount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const discount = yield discountModel.findByPk(id);
        if (!discount) {
            res.status(404).json({ message: 'Discount not found' });
            return;
        }
        yield discount.destroy();
        res.status(200).json({ message: 'Discount deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete discount', error });
    }
});
module.exports = {
    createDiscount,
    getAllDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount,
    checkVoucherCode
};
//# sourceMappingURL=discountHandler.js.map