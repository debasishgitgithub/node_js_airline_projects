// services/user-service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const CONSTANTS = require('../config/constant');

class UserService {

  async create(data) {
    if (!data.email || !data.password || !data.role) {
      throw new AppError('Email and Role and Password required', StatusCodes.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      email: data.email,
      password: hashedPassword,
      role: data.role
    });

    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email: email } });

    if (!user) throw new AppError('User not found', StatusCodes.NOT_FOUND);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError('Invalid password');

    let jwtPayload = {
      id: user.id,
      role: user.role
    }
    // JWT Token
    const token = jwt.sign(
      jwtPayload,
      CONSTANTS.JWT_SECRET_KEY,
      { expiresIn: CONSTANTS.JWT_EXPIRES_TIME }
    );

    return { user, token };
  }
}

module.exports = UserService;