"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const node_cron_1 = __importDefault(require("node-cron"));
// import {getCredit  , sendSMS} from '@/Config/'
// import { allRoutes } from "@/router/router.js";
// import { sendCustomerNotice } from './workers/remembering';
const app = (0, express_1.default)();
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? 3000 : 3200;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)());
// app.use(allRoutes);
app.use('/', () => {
    // tslint:disable-next-line:no-console
    console.log("reach");
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal server error" });
});
node_cron_1.default.schedule('0 18 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    // getCredit()
}));
node_cron_1.default.schedule('0 19 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    // Main function to retrieve data
    // sendSMS("09033062112" , "it's reach first part ")
    if (isProduction) {
        // sendSMS("09033062112" , `it's reach second part ${isProduction} `)
        // sendCustomerNotice()
    }
    return;
}));
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("server is up on " + port + " port");
});
//# sourceMappingURL=index.js.map