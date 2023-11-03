const db = require("../Config/DBconfig");
const { DataTypes } = require('sequelize');


const reservationSpaceModel = db.define(
    'mariNail_Reservation_Spaces',
    {
        reservation_calender_id :{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        customer_id : {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue : null
        },
        space_state : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue : 0
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
        }
    },
    {
        timestamps: false,
    }
)

module.exports = {
    reservationSpaceModel 
}