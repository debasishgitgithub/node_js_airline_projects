const { StatusCodes } = require('http-status-codes');
const logger = require('../config/logger-config');
const ErrorResponse = require('../utils/common/error-response');
const AppError = require('../utils/errors/app-error');


function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(err);
    console.log(err.name);

    if (err instanceof AppError) {
        ErrorResponse.message = err.explanation;
        ErrorResponse.statusCode = err.statusCode;
    }

    // API request (Postman / Axios / Fetch)
    if (req.originalUrl.startsWith('/api/')) {
        if (err.name === 'SequelizeValidationError') {
            ErrorResponse.message = err.errors.map(e => e.message);
            statusCode = StatusCodes.BAD_REQUEST;
        }

        return res.status(statusCode).json(ErrorResponse);
    }

    // Page request (Browser)
    return res.status(statusCode).render('error', {
        message: ErrorResponse.message,
        statusCode
    });
}

module.exports = errorHandler;