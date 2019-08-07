'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const userService = require('../services/userService');

const opts = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
  issuer: 'accounts.examplesoft.com',
  audience: 'yoursite.net'
};

const strategy = new JwtStrategy(opts, handleStrategy);

async function handleStrategy(jwt_payload, done) {
  try {
    const user = await userService.find({id: jwt_payload.sub});

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