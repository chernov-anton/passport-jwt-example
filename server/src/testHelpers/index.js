'use strict';

const User = require('../models/user');
const userRepository = require('../repositories/userRepository');
const passwordUtils = require('../utils/passwordUtils');

async function createUser({email, password}) {
  const hashedPassword = passwordUtils.generateHash(password);
  const user = new User({email, hashedPassword});
  return userRepository.create(user);
}

async function deleteUser(email) {
  const user = await userRepository.findByEmail(email);
  await userRepository.delete(user.id);
}


async function findUserByEmail(email) {
  return userRepository.findByEmail(email);
}

module.exports = {
  createUser,
  deleteUser,
  findUserByEmail
};