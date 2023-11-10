const { Op } = require('sequelize');
const { customerModel, receptionModel, receptionServiceModel, subServiceModel } = require('../models');
const {noticeCustomer} = require('../Config/MeliPayamkconfig');
const { sendSMS } = require("../Config/MeliPayamkconfig");

//باید ی شرط اضافه کنیم به گت کاستومرمون که ایا این چیزی که پیدا کرده اخرین پذیرش مشتری هست یا ن  اگر اخرین بود بیاد برامون بفرسته پیامو


const calculateTime = (day) => {
  return Math.floor(Date.now() / 1000) - Number(day) * 24 * 60 * 60;
}
 
const getCustomerNoticeData = async (time , services) => {
  try {
    const tempCustomerData = await customerModel.findAll({
      include: [
        {
          model: receptionModel,
          where: {
            created_at: {
              [Op.between]: [time.start, time.end],
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
                    id: services
                  }
                }
              ]
            }
          ]
        }
      ]
    });
    const filteredData = await Promise.all(tempCustomerData.map(async (item) => {
    const customerReceptions = await receptionModel.findAll({
      where: {
        CUSTOMER_ID: {
          [Op.eq]: item.id,
        },
      },
    });

    if (customerReceptions[customerReceptions.length - 1].id === item.mariNail_Receptions[0].id) {
      return item;
    }
    return null; // or undefined
  }));

  return filteredData.filter(Boolean);

  } catch (error) {
    console.error('Error occurred:', error);
  }
}

const rememberNotice = async(time , services , serviceName) => {
  try {
    const customersData = await getCustomerNoticeData(time, services)
    //send sms to users
    customersData?.map((customer) => {
      noticeCustomer(customer.PHONE_NUMBER , customer.FIRST_NAME , serviceName )
    })
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

//TODO : IT NEED A LOT OF REFACTOR
const noticeTarmimPodr = async()  => {
  const unixDay = calculateTime(27);
  const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000
  rememberNotice({
    start: startUnixTime,
    end : new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
  },
  [48],
  'ترمیم پودر')
}

const noticeZhelishTabie = async () => {
  const unixDay = calculateTime(20);
  const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000
  rememberNotice({
    start: startUnixTime,
    end : new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
  },
  [51],
  'ژلیش ناخن طبیعی')
}

const noticeZhelish = async () => {
  const unixDay = calculateTime(60);
  const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000
  rememberNotice({
    start: startUnixTime,
    end : new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
  },
  [2],
  'ژلیش')
}

const noticeTarmimPa = async () => {
  const unixDay = calculateTime(60);
  const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000
  rememberNotice({
    start: startUnixTime,
    end : new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
  },
  [15],
  'ترمیم پا')
}

const noticeKashtPa = async () => {
  const unixDay = calculateTime(60);
  const startUnixTime = new Date(unixDay * 1000).setHours(19, 0, 0, 0) / 1000
  rememberNotice({
    start: startUnixTime,
    end : new Date(startUnixTime * 1000 + 24 * 60 * 60 * 1000).getTime() / 1000
  },
  [46],
  'کاشت پا')
}


const sendCustomerNotice =  async () => {
  noticeTarmimPodr(); 
  noticeZhelishTabie();
  noticeZhelish();
  noticeTarmimPa();
  noticeKashtPa();
  sendSMS("09033062112" , "cronJob worked at 19:01 ")
}

module.exports = {
  sendCustomerNotice
}