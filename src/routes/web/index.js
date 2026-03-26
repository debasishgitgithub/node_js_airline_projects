const express = require('express');
const cityRoutes = require('./city-routes');
const airplaneRoutes = require('./airplane-routes');

const router = express.Router();

router.use('/cities', cityRoutes);
router.use('/airplanes', airplaneRoutes);

module.exports = router;