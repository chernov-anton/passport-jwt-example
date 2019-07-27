'use strict';

const express = require('express');
const logger = require('morgan');

const router = require('./router');

const app = express();

const DEFAULT_PORT = 4000;
const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router);

// basic error handler
// last argument is the must! https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err || 500).json({message: err.message});
});

app.disable('x-powered-by');
app.listen(port, () => console.info(`Server listening on port ${port}`));

process.on('unhandledRejection', (err) => {
  logger.error(err, 'Unhandled Rejection')
});
