const router = require("express").Router();
const { customerClientRouter } = require('./customer');
const { postClientRouter } = require('./posts');
const {counselingClientRouter} = require('./counseling');
const {profileRouter} = require('./profile');
const { reservationClientRouter } = require("./reservation");

router.use('/customer', customerClientRouter);
router.use('/posts', postClientRouter);
router.use("/counseling", counselingClientRouter);
router.use("/profile", profileRouter);
router.use("/reservation", reservationClientRouter);

module.exports = {
    clientRouter : router
}