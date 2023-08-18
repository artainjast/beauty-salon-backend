const router = require('express').Router();
const { createCustomerDiscount, getAllCustomerDiscounts, getCustomerDiscountById, updateCustomerDiscount, deleteCustomerDiscount } = require('../../Controllers/Dashboard/customerDiscountHandler');
// Discount routes
router.post('/', createCustomerDiscount);
router.get('/', getAllCustomerDiscounts);
router.get('/:id', getCustomerDiscountById);
router.put('/:id', updateCustomerDiscount);
router.delete('/:id', deleteCustomerDiscount);
module.exports = {
    customerDiscountRouter: router
};
//# sourceMappingURL=customerDiscount.js.map