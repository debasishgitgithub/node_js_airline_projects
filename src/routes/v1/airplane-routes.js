const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');
const createUploader = require('../../config/multer-config');

const imageUpload = createUploader({
    allowedTypes: ['image/jpeg', 'image/png'],
    maxSize: 2 * 1024 * 1024, // 2MB
    folderPath: 'airplanes'
});

const router = express.Router();
router.post('/',
    // AirplaneMiddlewares.validateCreateRequest,
    (req, res, next) => {
        imageUpload.single('airplane_image')(req, res, (err) => {
            if (err) return next(err);
            next();
        });
    },
    AirplaneController.createAirplaneController
);

router.get('/get_all', AirplaneController.getAllAirplaneController);
router.get('/get/:id', AirplaneController.getByIdController);

router.put('/update/:id',
    // AirplaneMiddlewares.validateUpdateRequest,
    (req, res, next) => {
        imageUpload.single('airplane_image')(req, res, (err) => {
            if (err) return next(err);
            next();
        });
    },
    AirplaneController.updateAirplaneController
);

router.delete('/delete/:id', AirplaneController.deleteByIdController);


module.exports = router;