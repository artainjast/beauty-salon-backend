const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");
const counseling = db.define(
  'mariNail_CounselingRequests',
  {
    PHONENUMBER: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    NICKNAME: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true
    },
    CALLSTATE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    CREATED_AT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    UPDATE_AT: {
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
    timestamps: false
  }
);

module.exports = {
  counselingModel : counseling
} ;
// const { DataTypes } = require('sequelize')
// const db = require('../configs/db')

// const Category = db.define(
//   'Counseling',
//   {
//     phone_number: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     timestamps: false,
//   }
// )

// module.exports = Category
