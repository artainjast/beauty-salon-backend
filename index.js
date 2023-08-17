const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { allRoutes } = require("./router/router");
const cron = require('node-cron');
const { getCredit} = require("./Config/MeliPayamkconfig");
const {sendCustomerNotice} = require('./workers/remembering')
const app = express();
const isProduction =  process.env.NODE_ENV === 'production' 
const port = isProduction ? 3000 : 3200;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(allRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Internal server error" });
})
cron.schedule('0 18 * * *', async () => {
  getCredit()
});
cron.schedule('0 19 * * *', async () => {
  // Main function to retrieve data
  sendSMS("09033062112" , "it's reach first part ")

  if (isProduction) {
    sendSMS("09033062112" , `it's reach second part ${isProduction} `)

    sendCustomerNotice()
  }
  return;
});

app.listen(port, () => {
  console.log("server is up on " + port + " port");
});
