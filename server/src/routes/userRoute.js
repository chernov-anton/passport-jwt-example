const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/users/:id', passport.authenticate('jwt', {session: false}), userController.get);

module.exports = router;
