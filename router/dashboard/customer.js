const router = require("express").Router();
const {  addCustomer, editCustomer, deleteCustomer, getCustomers } = require("../../Controllers/Dashboard/customerHandler");

router.get('/', getCustomers);
router.post('/', addCustomer);
router.put('/', editCustomer); 
router.delete('/:id', deleteCustomer);

module.exports = {
  customerDashboardRouter: router,
};