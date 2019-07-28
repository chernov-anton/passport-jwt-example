'use strict';

const jwt = require('jsonwebtoken');
const config = require('../const');

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
      exp: Math.floor(Date.now() / 1000) + parseInt(config.JWT.live)
    },
    config.JWT.secret);
};

module.exports = {generateToken};