'use strict';

const {get} = require('lodash');

function matchIds(userIdPath) {
  return (req, res, next) => {
    if (userIdPath) {
      const areIdsEqual = req.user.id === get(req, userIdPath);

      if (!areIdsEqual) {
        return res.status(403).send({message: 'Ids should match!'});
      }
    }

    next();
  };
}

module.exports = {matchIds};