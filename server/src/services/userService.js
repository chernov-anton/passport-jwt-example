'use strict';

const User = require('../models/user');
const httpErrors = require('http-errors');
const userRepository = require('../repositories/userRepository');
const passwordUtils = require('../utils/passwordUtils');

class UserService {
  constructor({userRepository}) {
    this.userRepository = userRepository;
  }

  async find(id) {
    const user = await this.userRepository.find(id);

    if (!user) {
      throw  new httpErrors.NotFound('User not found!');
    }

    return this._removeSensitiveInfo(user);
  }

  async findByEmail(email) {
    return  this.userRepository.findByEmail(email);
  }

  async create({email, password}) {
    const hashedPassword = passwordUtils.generateHash(password);
    const newUser = new User({email, hashedPassword});
    return  this.userRepository.create(newUser);
  }

  async createGoogle({email, googleId}) {
    const newUser = new User({email, googleId});
    return this.userRepository.create(newUser);
  }

  _removeSensitiveInfo(user) {
    const {hashedPassword, ...secureUser} = user;

    return secureUser;
  }
}

module.exports = new UserService({userRepository});