const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { customerModel } = require('./customer');
const { capacityModel } = require('./capacity');

const reservationModel = sequelize.define(
  'mariNail_Reservation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      initialValue: 1000,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: customerModel,
        key: 'id',
      },
    },
    capacity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: capacityModel,
        key: 'id',
      },
    },
    reserved_slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(Date.now() / 1000),
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(Date.now() / 1000),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  reservationModel,
};
