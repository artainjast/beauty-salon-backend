const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");


const reservationCalenderModel = db.define(
    'mariNail_Reservation_Calender',{
        startTime : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endTime : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentSpace:{
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        maximumSpace:{
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
        deleted_at: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        timestamps: false,
    }
)

module.exports = {
    reservationCalenderModel
}