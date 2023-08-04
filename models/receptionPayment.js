const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");

const receptionPayment = db.define(
  'mariNail_ReceptionPayment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    reception_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'reception_id'
    },
    payment_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'payment_type_id'
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    timestamps: false,
    underscored: false,
  }
);



module.exports = {
  receptionPaymentModel : receptionPayment
};
