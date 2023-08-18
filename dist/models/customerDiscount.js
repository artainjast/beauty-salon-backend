const { DataTypes } = require('sequelize');
const db = require('../Config/DBconfig');
const customerDiscounts = db.define('mariNail_CustomerDiscounts', {
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false,
    underscored: false,
});
module.exports = {
    customerDiscountsModel: customerDiscounts
};
//# sourceMappingURL=customerDiscount.js.map