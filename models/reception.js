const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");

const reception = db.define(
  'mariNail_Receptions',
  {
    CUSTOMER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false,
      field: 'CUSTOMER_ID'
    },
    PRICE: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: false
    },
    DESCRIPTION: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false
    },
    receptionID: {
      type: DataTypes.STRING, // or any appropriate data type for the reception ID
      allowNull: false,
      unique: true,
    },
    CREATED_AT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    UPDATED_AT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    DELETED_AT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: false,
    underscored: false,
  }
);


module.exports = {
  receptionModel: reception
};
