const router = require('express').Router();
const { createDynamicRoutineReservations , createMyself } = require('../../Controllers/Dashboard/reservationHandler');

router.post('/' , createMyself);

module.exports = {
    capacityDashboardRouter : router
}