const {customerDiscountsModel} = require('../../../models/index');

// Create a customer discount
const createCustomerDiscount = async (req, res, next) => {
  try {
    const { customerId, discountId, used } = req.body;
    // Validate the request body
    if (!customerId || !discountId) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }
    
    // Create the customer discount
    const customerDiscount = await customerDiscountsModel.create({
      customerId,
      discountId,
      used: used || false
    });

    res.status(201).json(customerDiscount);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create customer discount', error });
  }
};

// Get all customer discounts
const getAllCustomerDiscounts = async (req, res, next) => {
  try {
    const customerDiscounts = await customerDiscountsModel.findAll();
    res.status(200).json(customerDiscounts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve customer discounts', error });
  }
};

// Get a customer discount by ID
const getCustomerDiscountById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customerDiscount = await customerDiscountsModel.findByPk(id);
    
    if (!customerDiscount) {
      res.status(404).json({ message: 'Customer discount not found' });
      return;
    }
    
    res.status(200).json(customerDiscount);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve customer discount', error });
  }
};

// Update a customer discount
const updateCustomerDiscount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customerId, discountId, used } = req.body;
    
    // Validate the request body
    if (!customerId || !discountId) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }
    
    // Update the customer discount
    const customerDiscount = await customerDiscountsModel.findByPk(id);
    
    if (!customerDiscount) {
      res.status(404).json({ message: 'Customer discount not found' });
      return;
    }
    
    customerDiscount.customerId = customerId;
    customerDiscount.discountId = discountId;
    customerDiscount.used = used || customerDiscount.used;
    await customerDiscount.save();
    
    res.status(200).json(customerDiscount);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update customer discount', error });
  }
};

// Delete a customer discount
const deleteCustomerDiscount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customerDiscount = await customerDiscountsModel.findByPk(id);
    
    if (!customerDiscount) {
      res.status(404).json({ message: 'Customer discount not found' });
      return;
    }
    
    await customerDiscount.destroy();
    res.status(200).json({ message: 'Customer discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete customer discount', error });
  }
};

module.exports = {
  createCustomerDiscount,
  getAllCustomerDiscounts,
  getCustomerDiscountById,
  updateCustomerDiscount,
  deleteCustomerDiscount
};
