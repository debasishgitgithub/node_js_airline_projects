const multer = require('multer');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const fs = require('fs'); // Added File System module
const uploadPath = 'uploads';

const createUploader = ({ allowedTypes, maxSize, folderPath = '' }) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const fullPath = path.join(uploadPath, folderPath);
            console.log('----------',fullPath);
            // Create directory if it doesn't exist
            // { recursive: true } ensures nested folders are created
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
            }

            cb(null, fullPath);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = Date.now() + '-' + Math.random().toString(9).slice(2);
            cb(null, fileName + ext);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new AppError(`Invalid file type: ${file.mimetype}`, StatusCodes.BAD_REQUEST), false);
        }
        cb(null, true);
    };

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize
        }
    });
};

module.exports = createUploader;