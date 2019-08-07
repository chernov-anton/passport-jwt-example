'use strict';

require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('./config/passport');

const router = require('./router');

function startApp() {
  const app = express();

  app.use(cors());
  app.use(logger('dev'));
  app.use(passport.initialize());
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  app.use('/', router);
  app.disable('x-powered-by');

  process.on('unhandledRejection', (err) => {
    logger.error(err, 'Unhandled Rejection');
  });

  return app;
}

module.exports = startApp;


