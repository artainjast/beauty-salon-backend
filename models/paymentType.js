const { DataTypes } = require('sequelize');
const db = require('../Config/DBconfig');

const paymentType = db.define(
  'mariNail_PaymentTypes',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
    underscored: false
  }
);

module.exports = {
  paymentTypeModel: paymentType
};
