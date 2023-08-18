const router = require("express").Router();
const { addCounseling, } = require("../../Controllers/Website/counselingHandler");
router.post("/", addCounseling);
module.exports = {
    counselingClientRouter: router,
};
//# sourceMappingURL=counseling.js.map