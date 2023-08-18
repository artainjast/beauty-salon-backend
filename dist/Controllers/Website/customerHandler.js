var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { customerModel } = require('../../../models/customer');
function getCustomerData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the customer ID from the decoded JWT token
            const customerId = req.user.customerId;
            // Find the customer in the database
            const customer = yield customerModel.findByPk(customerId, {
                attributes: {
                    exclude: ['id', 'CREATED_AT', 'UPDATED_AT', 'DELETED_AT']
                }
            });
            // If the customer doesn't exist, return a 404 error
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            // If the customer exists, return their data
            return res.json(customer);
        }
        catch (error) {
            // If an error occurs, pass it to the error handling middleware
            return next(error);
        }
    });
}
module.exports = {
    getCustomerData
};
//# sourceMappingURL=customerHandler.js.map