


const { customerModel } = require('../../../models/customer');

async function getCustomerData(req, res, next) {
  try {
    // Get the customer ID from the decoded JWT token
    const customerId = req.user.customerId;

    // Find the customer in the database
    const customer = await customerModel.findByPk(customerId,  {
        attributes: {
          exclude: ['id','CREATED_AT', 'UPDATED_AT', 'DELETED_AT' ]
        }
      });

    // If the customer doesn't exist, return a 404 error
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // If the customer exists, return their data
    return res.json(customer);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    return next(error);
  }
}




module.exports = {
    getCustomerData
}