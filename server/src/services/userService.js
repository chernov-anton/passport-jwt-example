'use strict';

const User = require('../models/user');
const createError = require('http-errors');
const userRepository = require('../repositories/userRepository');
const passwordUtils = require('../utils/passwordUtils');

class UserService {
  constructor({userRepository}) {
    this.userRepository = userRepository;
  }

  async find(id) {
    const user = await this.userRepository.find(id);

    if (!user) {
      throw  new createError.NotFound('User not found!');
    }

    return this._removeSensitiveInfo(user);
  }

  async create({email, password}) {
    const hashedPassword = passwordUtils.generateHash(password);
    const newUser = new User({email, hashedPassword});
    await this.userRepository.create(newUser);
  }

  _removeSensitiveInfo(user) {
    const {hashedPassword, ...secureUser} = user;

    return secureUser;
  }
}

module.exports = new UserService({userRepository});