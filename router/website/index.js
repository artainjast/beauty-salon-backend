const router = require("express").Router();
const { customerClientRouter } = require('./customer');
const { postClientRouter } = require('./posts');
const {counselingClientRouter} = require('./counseling');
const {profileRouter} = require('./profile');

router.use('/customer', customerClientRouter);
router.use('/posts', postClientRouter);
router.use("/counseling", counselingClientRouter);
router.use("/profile", profileRouter);

module.exports = {
    clientRouter : router
}