'use strict';

const {Strategy} = require('passport-token-google');
const userService = require('../../services/userService');
const config = require('../../config');

const handleGoogleAuth = async (token, refreshToken, profile, done) => {
  try {
    const email = profile._json.email;
    const googleId = profile._json.sub;
    const user = await userService.findByGoogleId(googleId);
    if (user) {
      return done(null, user);
    } else {
      const newUser = await userService.createGoogle({email, googleId});
      return done(null, newUser);
    }

  } catch (error) {
    done(error, false);
  }
};

const strategy = new Strategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret
  },
  handleGoogleAuth
);

module.exports = strategy;


