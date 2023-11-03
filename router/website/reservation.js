const router = require("express").Router();
const {getReservationCapacityByDate , submitReservationByCustomer} = require('../../Controllers/Website/reservationHandler');
const { addCustomerIdToRequest } = require("../../middlewares/middleware");

router.get("/", getReservationCapacityByDate);
router.post("/:calenderId", addCustomerIdToRequest , submitReservationByCustomer);

module.exports = {
  reservationClientRouter: router,
};
