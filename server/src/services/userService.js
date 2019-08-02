'use strict';

const createError = require('http-errors');
const userRepository = require('../repositories/userRepository');

class UserService {
  constructor({userRepository}) {
    this.userRepository = userRepository;
  }

  async get(id) {
    const user = await this.userRepository.find(id);

    if (!user) {
      throw  new createError.NotFound('User not found!');
    }

    return this._removeSensitiveInfo(user);
  }

  _removeSensitiveInfo(user) {
    const {hashedPassword, ...secureUser} = user;

    return secureUser;
  }
}

module.exports = new UserService({userRepository});