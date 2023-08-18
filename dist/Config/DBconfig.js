require("dotenv").config();
const Sequelize = require("sequelize");
let db;
try {
    if (process.env.NODE_ENV === "production") {
        db = new Sequelize(`${process.env.DB_HOST}/${process.env.DB_NAME}`, {
            logging: false
        });
    }
    else {
        db = new Sequelize(`${process.env.DB_HOST_LOCAL}`, {
        // logging: false
        });
    }
}
catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
}
try {
    db.authenticate();
    // tslint:disable-next-line:no-console
    console.log("Connection has been established successfully.");
}
catch (error) {
    // tslint:disable-next-line:no-console
    console.error("Unable to connect to the database:", error);
}
module.exports = db;
//# sourceMappingURL=DBconfig.js.map