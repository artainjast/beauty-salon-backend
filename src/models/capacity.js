const { DataTypes } = require('sequelize');
const db = require('../Config/DBconfig');

const capacity = db.define(
  'mariNail_Capacities',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reserved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
  capacityModel :capacity
};
