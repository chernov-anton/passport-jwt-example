'use strict';

const httpErrors = require('http-errors');
const userService = require('./userService');
const userRepository = require('../repositories/userRepository');
const jwtUtils = require('../utils/jwtUtils');
const passwordUtils = require('../utils/passwordUtils');

class AuthService {
  constructor({userRepository, userService}) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);

    this._checkUserPassword(user, password);

    const token = jwtUtils.signToken(user.id);

    return {token};
  }

  async register(email, password) {
    const user = await this.userRepository.findByEmail(email);

    this._checkUserExists(user);

    await this.userService.create({email, password});
  }

  async loginWithGoogle(userId) {
    const token = jwtUtils.signToken(userId);

    return {token};
  }

  _checkUserPassword(user, password) {
    if (!user || !user.hashedPassword || !passwordUtils.isPasswordValid(password, user.hashedPassword)) {
      throw new httpErrors.Unauthorized('Email or password is invalid!');
    }
  }

  _checkUserExists(user) {
    if (user) {
      throw new httpErrors.Conflict('User already exists!');
    }
  }
}

module.exports = new AuthService({userRepository, userService});