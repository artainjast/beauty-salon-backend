const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");
const { customerModel } = require("./customer");

const Referral = db.define(
  "mariNail_Referral",
  
  {
    referred_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: customerModel,
        key: "id"
      }
    },
    referrer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: customerModel,
        key: "id"
      }
    },
    created_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
      },
      updated_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Math.floor(Date.now() / 1000)
      },
      deleted_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
  },
  {
    timestamps: false,
  }
);

module.exports = {
  referralModel: Referral
};