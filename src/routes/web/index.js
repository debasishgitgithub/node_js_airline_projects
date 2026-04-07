const express = require('express');
const cityRoutes = require('./city-routes');
const airplaneRoutes = require('./airplane-routes');
const ticketRoutes = require('./ticket-routes');

const router = express.Router();

router.use('/cities', cityRoutes);
router.use('/airplanes', airplaneRoutes);
router.use('/tickets', ticketRoutes);

module.exports = router;