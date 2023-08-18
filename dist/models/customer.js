const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");
const customer = db.define("mariNail_Customers", {
    FIRST_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
    },
    LAST_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PHONE_NUMBER: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    REFER_CODE: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CREATED_AT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000),
    },
    UPDATED_AT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000),
    },
    DELETED_AT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: false,
});
module.exports = {
    customerModel: customer,
};
//# sourceMappingURL=customer.js.map