const AppError = require('../utils/errors/app-error');
const CONSTANTS = require('../config/constant');
const { StatusCodes } = require('http-status-codes');

function authorizeRoles(...roles) {
  return (req, res, next) => {

      if (!roles.includes(req.user.role)) {
      throw new AppError('You are not authorized', StatusCodes.UNAUTHORIZED);
    }

    next();
  };
}

module.exports = { authorizeRoles };