const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { allRoutes } = require("./router/router");
const app = express();
const cron = require('node-cron');
const {getCustomerHadTarmim} = require('./workers/remembering')
const { getCredit} = require("./Config/MeliPayamkconfig");
const port = process.env.NODE_ENV === 'production' ? 3000 : 3200;
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
  
  process.env.NODE_ENV === 'production' && getCustomerHadTarmim();
  sendSMS("09033062112" , "cron worked at 19:00 ")
});

app.listen(port, () => {
  console.log("server is up on " + port + " port");
});
