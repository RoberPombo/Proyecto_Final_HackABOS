'use strict';

// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const { configRoutes } = require('./config');
const { routes } = require('./routes');
const { httpErrorResponseController, httpResponseController } = require('./controllers');
// Declared environment variables ==================================================================
const { PORT: port } = process.env;


const app = express();

app.use(configRoutes);

app.use('/api/v1', routes);

app.use(httpResponseController);

app.use(httpErrorResponseController);


const startServer = async() => {
  app.listen(port, () => {
    console.log(`Server running and listening on port ${port}.`);
  });
};


module.exports = {
  startServer,
};
