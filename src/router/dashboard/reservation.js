const router = require('express').Router();
const { addCapacity } = require('../../Controllers/Dashboard/reservationHandler');

router.post('/' , addCapacity);

module.exports = {
    capacityDashboardRouter : router
}