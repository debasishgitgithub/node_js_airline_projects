const express = require('express');

const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/cities POST
router.post('/', 
        // CityMiddlewares.validateCreateRequest,
        CityController.create);

// /api/v1/cities GET
router.get('/get_all', CityController.getAll);
router.get('/get/:id', CityController.get);


module.exports = router;