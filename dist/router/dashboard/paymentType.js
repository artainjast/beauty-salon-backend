const router = require('express').Router();
const { createPaymentType, getAllPaymentTypes, getPaymentTypeById, updatePaymentType, deletePaymentType } = require('../../Controllers/Dashboard/paymentTypeHandler');
// Create a reception type
router.post('/', createPaymentType);
// Get all reception types
router.get('/', getAllPaymentTypes);
// Get a specific reception type by ID
router.get('/:id', getPaymentTypeById);
// Update a reception type
router.put('/:id', updatePaymentType);
// Delete a reception type
router.delete('/:id', deletePaymentType);
module.exports = { paymentTypeRouter: router };
//# sourceMappingURL=paymentType.js.map