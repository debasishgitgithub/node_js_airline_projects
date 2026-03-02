const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const router = express.Router();
router.post('/',
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplaneController
);

router.get('/get_all', AirplaneController.getAllAirplaneController);
router.get('/get/:id', AirplaneController.getByIdController);

router.put('/update/:id',
    // AirplaneMiddlewares.validateUpdateRequest,
    AirplaneController.updateAirplaneController
);

router.delete('/delete/:id', AirplaneController.deleteByIdController);


module.exports = router;