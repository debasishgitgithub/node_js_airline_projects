// middlewares/auth-middleware.js
const jwt = require('jsonwebtoken');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const CONSTANTS = require('../config/constant');

function isAuthenticated(req, res, next) {

    // ✅ 1. Check session (Web)

    if (req.session && req.session.user) {
        req.user = req.session.user;
        return next();
    }

    // ✅ 2. Check JWT (API)
    const authHeader = req?.headers?.authorization;

    if (!authHeader) {
         return next(new AppError('Unauthorized', StatusCodes.UNAUTHORIZED));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, CONSTANTS.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return next(new AppError('Invalid token', StatusCodes.UNAUTHORIZED));
    }

}

module.exports = { isAuthenticated };