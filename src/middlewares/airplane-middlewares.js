const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');


function validateCreateRequest(req, res, next) {
    next();
}

module.exports = {
    validateCreateRequest
}