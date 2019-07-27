'use strict';

const express = require('express');

const router = express.Router();

const indexRoutes = require('./routes/index');

router.use('/', indexRoutes);
module.exports = router;
