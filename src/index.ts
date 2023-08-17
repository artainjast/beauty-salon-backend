import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import cron from 'node-cron';
// import {getCredit  , sendSMS} from '@/Config/'
// import { allRoutes } from "@/router/router.js";
// import { sendCustomerNotice } from './workers/remembering';
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
// app.use(allRoutes);
app.use('/' , () => {
  // tslint:disable-next-line:no-console
  console.log("reach");

})
app.use((err : any, req : any, res : any, next: any) => {
  res.status(500).json({ message: "Internal server error" });
})
cron.schedule('0 18 * * *', async () => {
  // getCredit()
});
cron.schedule('0 19 * * *', async () => {
  // Main function to retrieve data
  // sendSMS("09033062112" , "it's reach first part ")

  if (isProduction) {
    // sendSMS("09033062112" , `it's reach second part ${isProduction} `)

    // sendCustomerNotice()
  }
  return;
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log("server is up on " + port + " port");
});
