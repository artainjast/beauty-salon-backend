const { Op } = require('sequelize');
const { customerModel, receptionModel, receptionServiceModel, subServiceModel } = require('../models');
const {rememberingCustomer} = require('../Config/MeliPayamkconfig');

async function getCustomerHadTarmim() {
    try {
      // Calculate the time range
      const threeWeeksAgo = Math.floor(Date.now() / 1000) - 21 * 24 * 60 * 60;
      const startTime = new Date(threeWeeksAgo * 1000).setHours(19, 0, 0, 0) / 1000;
      const endTime = new Date(startTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000;
      // Retrieve data using Sequelize
      const data = await customerModel.findAll({
        include: [
          {
            model: receptionModel,
            where: {
              created_at: {
                [Op.between]: [startTime, endTime],
                [Op.not] : 0
              },
            },
            include: [
              {
                model: receptionServiceModel,
                include: [
                  {
                    model: subServiceModel,
                    where: {
                      id: [1, 2, 3 , 15] 
                    }
                  }
                ]
              }
            ]
          }
        ]
      });
      //send sms to users
      data.map((customer) => {
         rememberingCustomer(customer.PHONE_NUMBER , customer.FIRST_NAME)
      })
    } catch (error) {
      console.error('Error occurred:', error);
    }
}

module.exports = {
    getCustomerHadTarmim ,
}