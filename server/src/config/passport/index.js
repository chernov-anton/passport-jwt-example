'use strict';

const passport = require('passport');
const jwtStrategy = require('./jwt');
const googleStrategy = require('./google');

passport.use('jwt', jwtStrategy);
passport.use('google', googleStrategy);