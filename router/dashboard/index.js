const router = require("express").Router();
const {customerDashboardRouter} = require('./customer');
const {counselingDashboardRouter} = require('./counseling');
const { callStateDashboardRouter } = require("./callState");
const { mainServiceDashboardRouter } = require("./mainService");
const { subServiceDashboardRouter } = require("./subService");
const { postDashboardRouter } = require("./pots");
const { receptionDashboardRouter } = require("./reception");
const { capacityDashboardRouter } = require("./reservation");
const { paymentTypeRouter } = require("./paymentType");
const { discountRouter } = require("./discount");
const { customerDiscountRouter } = require("./customerDiscount");

router.use('/customer', customerDashboardRouter);
router.use("/counseling", counselingDashboardRouter);
router.use("/call-state", callStateDashboardRouter);
router.use("/main-service", mainServiceDashboardRouter);
router.use("/sub-service", subServiceDashboardRouter);
router.use('/posts' , postDashboardRouter);
router.use('/reception', receptionDashboardRouter);
router.use('/capacity' , capacityDashboardRouter);
router.use('/payment-type' , paymentTypeRouter);
router.use('/discount' , discountRouter);
router.use('/customer-discount' , customerDiscountRouter);

module.exports = {
    dashboardRouter : router
}