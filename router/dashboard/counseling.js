const router = require("express").Router();
const {
    getCounseling,
    changeCounselingCallState,
  } = require("../../Controllers/Website/counselingHandler");
 
router.get("/", getCounseling);
router.put("/:id", changeCounselingCallState);

module.exports = {
    counselingDashboardRouter : router
}