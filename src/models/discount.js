const { DataTypes } = require('sequelize');
const db = require('../Config/DBconfig');

const discount = db.define(
  'mariNail_Discounts',
  {
    voucherCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    type: {
        type : DataTypes.STRING,
        allowNull: false,
        defaultValue : 'fixed'
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
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    underscored: false,
  }
);

module.exports = {
    discountModel : discount
} ;
