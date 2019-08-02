'use strict';

const routeUtils = require('../utils/routeUtils');
const userService = require('../services/userService');

function get(req) {
  const {id} = req.params;
  return userService.get(id);
}

module.exports = {
  get: routeUtils.handleResponse(get)
};