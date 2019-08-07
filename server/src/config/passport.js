'use strict';

const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const userService = require('../services/userService');
const config = require('../config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT.secret,
  issuer: config.JWT.issuer,
  audience: config.JWT.audience,
};

const strategy = new Strategy(opts, handleStrategy);

async function handleStrategy(jwt_payload, done) {
  try {
    const user = await userService.find(jwt_payload.sub);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    done(e, false);
  }
}

passport.use('jwt', strategy);