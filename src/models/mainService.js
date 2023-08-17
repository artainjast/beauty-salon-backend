const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");

const mainService = db.define(
  "mariNail_MainServices",
  {
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
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
  },
  {
    timestamps: false,
  }
);

module.exports = {
  mainServiceModel: mainService
};