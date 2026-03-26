const express = require('express');
const { InfoController } = require('../../controllers');
const airplaneRoutes = require('./airplane-routes');
const airportRoutes = require('./airport-routes');
const cityRoutes = require('./city-routes');
const flightRoutes = require('./flight-routes');
const userRoutes = require('./user-routes');

const router = express.Router();

router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airports', airportRoutes);
router.get('/info', InfoController.info);
router.use('/flights', flightRoutes);
router.use('/users', userRoutes);

module.exports = router;