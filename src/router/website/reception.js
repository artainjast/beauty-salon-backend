const router = require("express").Router();
const { authenticateClientJWT } = require('../../middlewares/middleware')
const { getUserReceptions } = require("../../Controllers/Dashboard/receptionHandler");


router.get('/' , authenticateClientJWT , getUserReceptions);

module.exports = {
    receptionClientRouter : router
}
