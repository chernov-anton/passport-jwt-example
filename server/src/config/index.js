'use strict';

module.exports = {
  googleAuth: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  },
  JWT: {
    secret: process.env.SECRET_JWT,
    issuer: process.env.ISSUER,
    audience: process.env.AUDIENCE,
    live: process.env.JWT_LIVE
  }
};