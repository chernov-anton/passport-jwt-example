'use strict';

const express = require('express');

const router = express.Router();

const healthRoutes = require('./routes/index');
const consentRoutes = require('./routes/users');

router.use('/', healthRoutes);
router.use('/', consentRoutes);
module.exports = router;
