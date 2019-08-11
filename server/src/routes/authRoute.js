const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.post('/auth/google', passport.authenticate('google', {session: false}), authController.loginWithGoogle);

module.exports = router;
