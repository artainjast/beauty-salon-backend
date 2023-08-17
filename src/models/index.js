const { customerModel } = require('./customer');
const { receptionModel } = require('./reception');
const { receptionServiceModel } = require('./receptionService');
const { subServiceModel } = require('./subService');
const { paymentTypeModel } = require('./paymentType');
const { receptionPaymentModel } = require('./receptionPayment');
const { discountModel } = require('./discount');
const { customerDiscountsModel } = require('./customerDiscount');

customerModel.hasMany(receptionModel ,  { foreignKey: 'CUSTOMER_ID' });
receptionModel.belongsTo(customerModel, { foreignKey: 'CUSTOMER_ID' });

receptionModel.belongsToMany(subServiceModel, { through: receptionServiceModel , foreignKey: 'RECEPTION_ID'});
subServiceModel.belongsToMany(receptionModel, { through: receptionServiceModel , foreignKey: 'SUB_SERVICE_ID'});

receptionServiceModel.belongsTo(receptionModel , { foreignKey: 'RECEPTION_ID' } );
receptionServiceModel.belongsTo(subServiceModel , { foreignKey: 'SUB_SERVICE_ID'});
receptionModel.hasMany(receptionServiceModel, { foreignKey: 'RECEPTION_ID' });
subServiceModel.hasMany(receptionServiceModel ,{ foreignKey: 'SUB_SERVICE_ID'});

receptionModel.belongsToMany(paymentTypeModel, {
  through: receptionPaymentModel,
  foreignKey: 'receptionId',
  otherKey: 'paymentTypeId'
});

paymentTypeModel.belongsToMany(receptionModel, {
  through: receptionPaymentModel,
  foreignKey: 'paymentTypeId',
  otherKey: 'receptionId'
});

discountModel.belongsToMany(customerModel, {
  through: customerDiscountsModel,
  foreignKey: 'discountId',
  otherKey: 'customerId',
});

customerModel.belongsToMany(discountModel, {
  through: customerDiscountsModel,
  foreignKey: 'customerId',
  otherKey: 'discountId', 

});
customerDiscountsModel.belongsTo(receptionModel, {
  foreignKey: 'receptionId',
});

module.exports = {
  customerModel,
  receptionModel,
  receptionServiceModel,
  subServiceModel,
  paymentTypeModel,
  receptionPaymentModel,
  discountModel,
  customerDiscountsModel
};
