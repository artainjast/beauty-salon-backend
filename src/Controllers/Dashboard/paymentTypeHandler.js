const {paymentTypeModel} = require('../../../models/paymentType');

// Create a payment type
const createPaymentType = async (req, res, next) => {
  try {
    const { name } = req.body;
    const unixTime = Math.floor(Date.now() / 1000);
    
    const paymentType = await paymentTypeModel.create({ name, created_at: unixTime, updated_at: unixTime });
    res.status(200).json({
      status: 1,
      message: 'Payment type created successfully',
      data: paymentType
    });
  } catch (error) {
    res.status(500).json({
      status: -1,
      message: 'Failed to create payment type',
      error: error.message
    });
  }
};

// Get all payment types
const getAllPaymentTypes = async (req, res, next) => {
  try {
    const paymentTypes = await paymentTypeModel.findAll({
      where: {
        deleted_at: 0
      }
    });
    res.status(200).json({
      status: 1,
      message: 'Payment types retrieved successfully',
      data: paymentTypes
    });
  } catch (error) {
    res.status(500).json({
      status: -1,
      message: 'Failed to retrieve payment types',
      error: error.message
    });
  }
};

// Get a specific payment type by ID
const getPaymentTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paymentType = await paymentTypeModel.findOne({
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
  } catch (error) {
    res.status(500).json({
      status: -1,
      message: 'Failed to retrieve payment type',
      error: error.message
    });
  }
};

// Update a payment type
const updatePaymentType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const unixTime = Math.floor(Date.now() / 1000);
    const paymentType = await paymentTypeModel.findOne({
      where: {
        id,
        deleted_at: 0
      }
    });
    if (!paymentType) {
      throw new Error('Payment type not found');
    }
    await paymentType.update({ name, updated_at: unixTime });
    res.status(200).json({
      status: 1,
      message: 'Payment type updated successfully',
      data: paymentType
    });
  } catch (error) {
    res.status(500).json({
      status: -1,
      message: 'Failed to update payment type',
      error: error.message
    });
  }
};

// Delete a payment type
const deletePaymentType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const unixTime = Math.floor(Date.now() / 1000);
    const paymentType = await paymentTypeModel.findOne({
      where: {
        id,
        deleted_at: 0
      }
    });
    if (!paymentType) {
      throw new Error('Payment type not found');
    }
    await paymentType.update({ deleted_at: unixTime });
    res.status(200).json({
      status: 1,
      message: 'Payment type deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: -1,
      message: 'Failed to delete payment type',
      error: error.message
    });
  }
};

module.exports = {
  createPaymentType,
  getAllPaymentTypes,
  getPaymentTypeById,
  updatePaymentType,
  deletePaymentType
};
