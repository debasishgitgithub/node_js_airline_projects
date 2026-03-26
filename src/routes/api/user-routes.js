const express = require('express');
const { AuthMiddlewares, RoleMiddlewares } = require('../../middlewares');
const { UserController } = require('../../controllers');

const router = express.Router();

// /api/v1/cities POST
router.post('/signup', 
        UserController.create);

router.post('/login', 
        UserController.login);


module.exports = router;