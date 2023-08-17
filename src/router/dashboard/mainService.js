const router = require("express").Router();
const { addMainService } = require("../../Controllers/Dashboard/mainServiceHandler");

router.get("/" , addMainService);

module.exports = {
  mainServiceDashboardRouter: router,
};
