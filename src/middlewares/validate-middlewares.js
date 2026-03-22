const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const ErrorResponse = require('../utils/common/error-response');

// 1. For APIs: Returns a 400 JSON object
const apiValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    ErrorResponse.message = 'Valication failed';
    ErrorResponse.error = errors.array().map(err => ({ field: err.path, message: err.msg }));
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();

};

// 2. For Web: Re-renders the form with error messages and old input
const webValidation = (viewName) => (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render(viewName, {
      errors: errors.mapped(), // mapped() makes it easier to access by field name
      oldInput: req.body      // Keep the user's data so they don't have to re-type
    });
  }
  next();
};

module.exports = { apiValidation, webValidation };