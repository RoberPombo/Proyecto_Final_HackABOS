'use strict';

// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const { configRoutes } = require('./config/config.routes');
const { Console } = require('./config/config.winston');
const { httpErrorResponseController } = require('./controllers/http.error.response.controller');
const { httpResponseController } = require('./controllers/http.response.controller');
const { infoRequestController } = require('./controllers/info.request.controller');
const { routes } = require('./routes/index');
// Declared environment variables ==================================================================
const { PORT: port } = process.env;


const app = express();

app.use(configRoutes);

app.use(infoRequestController);

app.use('/api/v1', routes);

app.use(httpResponseController);

app.use(httpErrorResponseController);


const startServer = async() => {
  app.listen(port, () => {
    Console.log(`Server running and listening on port ${port}.`);
  });
};


module.exports = {
  startServer,
};
