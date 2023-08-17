const router = require('express').Router();
const {createDiscount , getAllDiscounts , getDiscountById , checkVoucherCode , updateDiscount , deleteDiscount } = require('../../Controllers/Dashboard/discountHandler')

// Discount routes
router.post('/', createDiscount);
router.get('/', getAllDiscounts);
router.get('/specific/:id', getDiscountById);
router.get('/:voucherCode', checkVoucherCode);
router.put('/:id', updateDiscount);
router.delete('/:id', deleteDiscount);

module.exports = {
    discountRouter : router
}