const router = require("express").Router();
const { clientAuthRouter } = require('./clientAuth');
const { dashboardLoginRouter } = require('./dashboardAuth');

router.use('/client', clientAuthRouter);
router.use('/dashboard', dashboardLoginRouter);


module.exports = {
    authRouter : router
}