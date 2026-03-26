const { StatusCodes } = require('http-status-codes');
const logger = require('../config/logger-config');
const multer = require('multer');
const ErrorResponse = require('../utils/common/error-response');
const AppError = require('../utils/errors/app-error');


function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    // Multer errors
    if (err instanceof multer.MulterError) {
        ErrorResponse.message = err.message
        statusCode = StatusCodes.BAD_REQUEST
    }
    // 🔹 Custom App Error
    if (err instanceof AppError) {
        ErrorResponse.message = err.explanation;
        ErrorResponse.statusCode = err.statusCode;
        ErrorResponse.error = err
    }
    // 🔹 Sequelize Validation Error
    else if (err.name === 'SequelizeValidationError') {
        ErrorResponse.message = err.errors.map(e => e.message);
        statusCode = StatusCodes.BAD_REQUEST;
        ErrorResponse.error = err;
    }

    // 🔹 Sequelize Unique Constraint Error
    else if (err.name === 'SequelizeUniqueConstraintError') {
        ErrorResponse.message = err.errors.map(e => e.message);
        statusCode = StatusCodes.BAD_REQUEST;
        ErrorResponse.error = err;
    }

    // 🔹 Unknown / JS Errors (IMPORTANT)
    else {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = err.message; // cleaner output
        console.log(err);
    }

    // API request (Postman / Axios / Fetch)
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(statusCode).json(ErrorResponse);
    }

    // Page request (Browser)
    return res.status(statusCode).render('error', {
        message: ErrorResponse.message,
        statusCode
    });
}

module.exports = errorHandler;