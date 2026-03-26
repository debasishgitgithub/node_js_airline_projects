const express = require('express');

const router = express.Router();

const apiRoutes = require('./api');
const webRoutes = require('./web');

router.use('/', webRoutes);
router.use('/api/v1', apiRoutes);


module.exports = router;