var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { customerDiscountsModel } = require('../../../models/index');
// Create a customer discount
const createCustomerDiscount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { customerId, discountId, used } = req.body;
        // Validate the request body
        if (!customerId || !discountId) {
            res.status(400).json({ message: 'Invalid request body' });
            return;
        }
        // Create the customer discount
        const customerDiscount = yield customerDiscountsModel.create({
            customerId,
            discountId,
            used: used || false
        });
        res.status(201).json(customerDiscount);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create customer discount', error });
    }
});
// Get all customer discounts
const getAllCustomerDiscounts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const customerDiscounts = yield customerDiscountsModel.findAll();
        res.status(200).json(customerDiscounts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve customer discounts', error });
    }
});
// Get a customer discount by ID
const getCustomerDiscountById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const customerDiscount = yield customerDiscountsModel.findByPk(id);
        if (!customerDiscount) {
            res.status(404).json({ message: 'Customer discount not found' });
            return;
        }
        res.status(200).json(customerDiscount);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve customer discount', error });
    }
});
// Update a customer discount
const updateCustomerDiscount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { customerId, discountId, used } = req.body;
        // Validate the request body
        if (!customerId || !discountId) {
            res.status(400).json({ message: 'Invalid request body' });
            return;
        }
        // Update the customer discount
        const customerDiscount = yield customerDiscountsModel.findByPk(id);
        if (!customerDiscount) {
            res.status(404).json({ message: 'Customer discount not found' });
            return;
        }
        customerDiscount.customerId = customerId;
        customerDiscount.discountId = discountId;
        customerDiscount.used = used || customerDiscount.used;
        yield customerDiscount.save();
        res.status(200).json(customerDiscount);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update customer discount', error });
    }
});
// Delete a customer discount
const deleteCustomerDiscount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const customerDiscount = yield customerDiscountsModel.findByPk(id);
        if (!customerDiscount) {
            res.status(404).json({ message: 'Customer discount not found' });
            return;
        }
        yield customerDiscount.destroy();
        res.status(200).json({ message: 'Customer discount deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete customer discount', error });
    }
});
module.exports = {
    createCustomerDiscount,
    getAllCustomerDiscounts,
    getCustomerDiscountById,
    updateCustomerDiscount,
    deleteCustomerDiscount
};
//# sourceMappingURL=customerDiscountHandler.js.map