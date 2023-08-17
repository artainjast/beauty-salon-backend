const router = require("express").Router();
const { customerClientRouter } = require('./customer');
const { postClientRouter } = require('./posts');
const {counselingClientRouter} = require('./counseling');
const {receptionClientRouter} = require('./reception');

router.use('/customer', customerClientRouter);
router.use('/posts', postClientRouter);
router.use("/counseling", counselingClientRouter);
router.use("/reception", receptionClientRouter);

module.exports = {
    clientRouter : router
}