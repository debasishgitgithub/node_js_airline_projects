const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const router = express.Router();
console.log('airplane routes called');
router.post('/',
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplaneController
);


module.exports = router;