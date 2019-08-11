'use strict';

const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const userService = require('../../services/userService');
const config = require('../../config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT.secret,
  issuer: config.JWT.issuer,
  audience: config.JWT.audience
};

async function handleStrategy(jwt_payload, next) {
  try {
    const user = await userService.find(jwt_payload.sub);

    if (user) {
      return next(null, user);
    } else {
      return next(null, false);
    }
  } catch (e) {
    next(e, false);
  }
}

const strategy = new Strategy(opts, handleStrategy);

module.exports = strategy;