const express = require('express');
const { AuthMiddlewares, RoleMiddlewares } = require('../../middlewares');

const { AirplaneController } = require('../../controllers');

const router = express.Router();
router.get('/',
        AirplaneController.create_form);


module.exports = router;