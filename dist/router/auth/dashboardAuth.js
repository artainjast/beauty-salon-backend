const router = require("express").Router();
const { dashboardLoginController } = require('../../Controllers/auth/dashboardAuth');
router.post("/signin", dashboardLoginController);
module.exports = {
    dashboardLoginRouter: router
};
//# sourceMappingURL=dashboardAuth.js.map