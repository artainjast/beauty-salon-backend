const {reservationCalenderModel , reservationSpaceModel} = require('../../models')
const { Op } = require("sequelize");

const getReservationCapacityByDate = async (req , res) => {
    try {
        const { date } = req.query;
        console.log(req);
        const startDate = new Date(date * 1000).setHours(0 , 0 , 0) / 1000
        const endDate = new Date(date * 1000).setHours(23 , 59 , 0) / 1000
        const calenderCapacity = await reservationCalenderModel.findAll({
            where: {
                startTime: {
                  [Op.gte]: startDate,
                },
                endTime: {
                  [Op.lte]:  endDate ,
                },
                deleted_at: {
                  [Op.eq]:  0 ,
                }
            },
            include : [{
                model : reservationSpaceModel,
                attributes : ['id' , 'space_state']
            }]
        })
        res.send({
            message: 'data got successfully',
            data:calenderCapacity,
            length : calenderCapacity.length
        })
    } catch (error) {
        console.log(error);
    }
}

const submitReservationByCustomer = async (req, res) => {
    try {
        //TODO: we need to add feature toggling to here for adding admin accept or payment accept
        const { calenderId } = req.params
        const customerId = req.user.customerId
        const reservationCalender = await reservationCalenderModel.findOne({
            where: {
                id: {
                    [Op.eq] : calenderId
                },
                currentSpace: {
                    [Op.ne] : 0
                }
            }
        })
        const emptySpace = await reservationSpaceModel.findOne({
            where: {
                reservation_calender_id: {
                    [Op.eq] : calenderId
                },
                customer_id: {
                    [Op.eq] : null
                }
            }
        })
        if (emptySpace && reservationCalender) {
            console.log(reservationCalender.currentSpace);
            emptySpace.set({
                customer_id: customerId,
                space_state : 2 //2 means need to accept by admin
            })
            reservationCalender.set({
                currentSpace : reservationCalender.currentSpace - 1
            })
            emptySpace.save();
            reservationCalender.save();
            res.send({
                status: 200,
                message : 'نوبت شما ثبت شد'
            })
            return
        }
        res.send({
            status: 201,
            message : 'نوبت ها پر شده‌اند'
        })
    } catch (error) {
        console.log(error);
        res.send({
            message : 'مشکلی پیش آمده است'
        })
    }
   
}

module.exports = {
    getReservationCapacityByDate,
    submitReservationByCustomer
}