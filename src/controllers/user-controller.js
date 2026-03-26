// controllers/auth-controller.js
const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common');

const userService = new UserService();

async function create(req, res, next) {
    try {
        const user = await userService.create(req.body);
        SuccessResponse.data = user;
        SuccessResponse.message = "Successfully create an user";

        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }

}

async function login(req, res, next) {
    try {
        const {email, password} = req.body
        const { user, token } = await userService.login(email, password );

        // ✅ For Web → store session
        req.session.user = user;

        SuccessResponse.data = { user, token };
        SuccessResponse.message = "Successfully login";

        // ✅ For API → send token
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }

}

module.exports = { create, login };