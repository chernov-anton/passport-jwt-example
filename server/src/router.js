'use strict';

const express = require('express');

const router = express.Router();

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

router.use('/', authRoute);
router.use('/', userRoute);

module.exports = router;
