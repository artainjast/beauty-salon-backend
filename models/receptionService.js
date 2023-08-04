const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");

const receptionService = db.define(
  'mariNail_Receptions_services',
  {
    RECEPTION_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    SUB_SERVICE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);



module.exports = {
  receptionServiceModel: receptionService,
}; 