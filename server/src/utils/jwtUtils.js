'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

const signToken = (id) => {
  return jwt.sign(
    {
      sub: id,
      exp: Math.floor(Date.now() / 1000) + parseInt(config.JWT.live),
      iss: config.JWT.issuer,
      aud: config.JWT.audience,
    },
    config.JWT.secret);
};

module.exports = {signToken};