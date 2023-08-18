const router = require("express").Router();
const { clientRouter } = require('./website');
const { dashboardRouter } = require('./dashboard/index');
const { authRouter } = require('./auth');
const { authenticateDashboardJWT } = require("../middlewares/middleware");
router.use("/", authRouter);
router.use("/client", clientRouter);
router.use("/dashboard", authenticateDashboardJWT, dashboardRouter);
router.use("*", (req, res) => {
    res.status(404).send("it not found");
});
module.exports = {
    allRoutes: router,
};
//# sourceMappingURL=router.js.map