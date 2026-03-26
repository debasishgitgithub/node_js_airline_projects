const express = require('express');
const { AuthMiddlewares, RoleMiddlewares } = require('../../middlewares');

const { CityController } = require('../../controllers');
const router = express.Router();

// /api/v1/cities POST
router.post('/',
        CityController.create);

// /api/v1/cities GET
router.get('/get_all',
        AuthMiddlewares.isAuthenticated,
        RoleMiddlewares.authorizeRoles('ADMIN', 'USER'),
        CityController.getAll);

router.get('/get/:id', 
        AuthMiddlewares.isAuthenticated,
        RoleMiddlewares.authorizeRoles('ADMIN', 'USER'),
        CityController.get);


module.exports = router;