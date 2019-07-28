'use strict';

const createError = require('http-errors');
const User = require('../models/user');
const userRepository = require('../repositories/userRepository');
const jwtUtils = require('../utils/jwtUtils');
const passwordUtils = require('../utils/passwordUtils');

class AuthService {
  constructor({userRepository}) {
    this.userRepository = userRepository;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);

    this._checkUserPassword(user, password);

    const token = jwtUtils.generateToken(user.id);

    return {token};
  }

  async register(email, password) {
    const user = await this.userRepository.findByEmail(email);

    this._checkUserExists(user);

    const hashedPassword = passwordUtils.generateHash(password);
    const newUser = new User({email, hashedPassword});
    await this.userRepository.create(newUser);
  }

  _checkUserPassword(user, password) {
    if (!user || !passwordUtils.isPasswordValid(password, user.hashedPassword)) {
      throw new createError.Unauthorized('Email or password is invalid!');
    }
  }

  _checkUserExists(user) {
    if (user) {
      throw new createError.Conflict('User already exists!');
    }
  }
}

module.exports = new AuthService({userRepository});