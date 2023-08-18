const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");
const subService = db.define("mariNail_SubServices", {
    NAME: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
    },
    MAIN_SERVICE_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
    },
    PRICE: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: 1
    },
    CREATED_AT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
    },
    UPDATE_AT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
    },
    DELETED_AT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});
module.exports = {
    subServiceModel: subService,
};
//# sourceMappingURL=subService.js.map