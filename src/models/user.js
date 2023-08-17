const { DataTypes } = require('sequelize')
const db  = require('../Config/DBconfig')

const user = db.define(
  'mariNail_Users',
  {
    FULLNAME: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    USERNAME: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
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
    timestamps: false
  }
);


module.exports = {
    userModel : user
}