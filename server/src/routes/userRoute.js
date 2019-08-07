const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const {matchIds} = require('../middlewares/auth');

router.get(
  '/users/:id',
  passport.authenticate('jwt', {session: false}),
  matchIds('params.id'),
  userController.get
);

module.exports = router;
