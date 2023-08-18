const {discountModel} = require('../../../models/index');
const randomstring = require("randomstring");

// Create a discount
const createDiscount = async (req, res, next) => {
  try {
    const { amount, type } = req.body;
    const voucherCode = randomstring.generate({ length: 6, type: "alphanumeric"  , capitalization: "lowercase"}) 
    const unixTime = Math.floor(Date.now() / 1000);

    // Validate the request body
    if (!voucherCode || !amount || !type ) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }
    // Create the discount
    const discount = await discountModel.create({
      voucherCode,
      amount,
      type,
      created_at : unixTime,
      updated_at : unixTime
    });

    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create discount', error });
  }
};

// Get all discounts
const getAllDiscounts = async (req, res, next) => {
  try {
    const discounts = await discountModel.findAll();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve discounts', error });
  }
};

// Get a discount by ID
const getDiscountById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const discount = await discountModel.findByPk(id);
    
    if (!discount) {
      res.status(404).json({ message: 'Discount not found' });
      return;
    }
    
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve discount', error });
  }
};

const checkVoucherCode = async (req, res, next) => {
  try {
    const { voucherCode } = req.params;

    // Retrieve the discount based on the voucher code
    const discount = await discountModel.findOne({
      where: {
        voucherCode: voucherCode,
      },
    });

    if (!discount) {
      // Discount not found
      res.status(404).json({ status : 0 , message: 'Voucher code not found' });
      return;
    }

    // Return the discount amount
    res.status(200).json({ 
      status : 1 ,
      data: [
          { 
            amount: discount.amount ,
            type : discount.type
          }
        ],
      message : 'کد تخفیف با موفقیت پیدا شد.'  
      });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve voucher code', error });
  }
};

// Update a discount
const updateDiscount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { voucherCode, amount, amountType } = req.body;
    
    // Validate the request body
    if (!voucherCode || !amount || !amountType) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }
    
    // Update the discount
    const discount = await discountModel.findByPk(id);
    
    if (!discount) {
      res.status(404).json({ message: 'Discount not found' });
      return;
    }
    
    discount.voucherCode = voucherCode;
    discount.amount = amount;
    discount.amountType = amountType;
    await discount.save();
    
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update discount', error });
  }
};

// Delete a discount
const deleteDiscount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const discount = await discountModel.findByPk(id);
    
    if (!discount) {
      res.status(404).json({ message: 'Discount not found' });
      return;
    }
    
    await discount.destroy();
    res.status(200).json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete discount', error });
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  checkVoucherCode
};
