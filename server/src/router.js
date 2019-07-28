'use strict';

const express = require('express');

const router = express.Router();

const authRoute = require('./routes/authRoute');

router.use('/', authRoute);

module.exports = router;
