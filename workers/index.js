const cron = require('node-cron');
const {sendSMS , getCredit  } = require('../Config/MeliPayamkconfig');
const { sendCustomerNotice  } = require('./remembering');
export const isProduction =  process.env.NODE_ENV === 'production' 

const setCrons = () => {
      cron.schedule('0 18 * * *', async () => {
        getCredit();
      });
      cron.schedule('0 19 * * *', async () => {
        // Main function to retrieve data
        sendSMS("09033062112" , "it's reach first part ")
        if (isProduction) {
          sendSMS("09033062112" , `it's reach second part ${isProduction} `)
          sendCustomerNotice();
        }
        return;
      });
      cron.schedule('0 20* * *', async () => {
        getCredit();
      });
}

module.exports =  setCrons;