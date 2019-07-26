var express = require('express');
var path = require('path');
var logger = require('morgan');

var router = require('./router');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

// error handler
app.use(function(err, req, res) {
  return res.status(err.status).json({message: err.message})
});

module.exports = app;
