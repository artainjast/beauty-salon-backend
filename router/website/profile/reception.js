const router = require("express").Router();
const { getUserReceptions } = require("../../../Controllers/Dashboard/receptionHandler");


router.get('/', getUserReceptions);

module.exports = {
    receptionClientRouter : router
}
