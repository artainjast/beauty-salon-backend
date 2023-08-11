const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { allRoutes } = require("./router/router");
const cron = require('node-cron');
const { getCredit} = require("./Config/MeliPayamkconfig");
const {sendCustomerNotice} = require('./workers/remembering')
const app = express();
const port = isProduction ? 3000 : 3200;
const isProduction =  process.env.NODE_ENV === 'production' 

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
  if (isProduction) {
    sendCustomerNotice()
  }
  return;
});

app.listen(port, () => {
  console.log("server is up on " + port + " port");
});
