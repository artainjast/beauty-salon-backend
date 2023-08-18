const { getCallStates, } = require("../../Controllers/Dashboard/callStateHandler");
const router = require("express").Router();
router.get("/", getCallStates);
module.exports = {
    callStateDashboardRouter: router,
};
//# sourceMappingURL=callState.js.map