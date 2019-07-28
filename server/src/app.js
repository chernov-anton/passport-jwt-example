'use strict';

const startApp = require('./appConfig');

const DEFAULT_PORT = 4000;
const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;
const app = startApp();

app.listen(port, () => console.info(`Server listening on port ${port}`));
