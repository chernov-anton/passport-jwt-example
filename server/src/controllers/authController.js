'use strict';

const routeUtils = require('../utils/routeUtils');
const authService = require('../services/authService');

function login(req) {
  const {email, password} = req.body;
  return authService.login(email, password);
}

function register(req) {
  const {email, password} = req.body;
  return authService.register(email, password);
}

function loginWithGoogle(req) {
  const {id} = req.user;
  return authService.loginWithGoogle(id);
}

module.exports = {
  login: routeUtils.handleResponse(login),
  register: routeUtils.handleResponse(register),
  loginWithGoogle: routeUtils.handleResponse(loginWithGoogle),
};