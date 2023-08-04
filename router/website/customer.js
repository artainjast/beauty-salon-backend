const router = require("express").Router();
const { decodeCustomerToken } = require('../../middlewares/middleware');
const {getCustomerData} = require('../../Controllers/Website/customerHandler')

router.get('/' , decodeCustomerToken ,getCustomerData )

module.exports = {
    customerClientRouter : router
}