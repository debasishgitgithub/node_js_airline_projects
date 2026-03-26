const express = require('express');
const { AuthMiddlewares, RoleMiddlewares } = require('../../middlewares');

const { CityController } = require('../../controllers');

const router = express.Router();
router.get('/',
        CityController.create_form);


module.exports = router;