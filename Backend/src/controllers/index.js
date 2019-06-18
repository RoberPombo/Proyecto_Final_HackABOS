'use strict';

// Local imports: this module ======================================================================
const { httpErrorResponseController } = require('./http.error.response.controller');
const { httpResponseController } = require('./http.response.controller');
const { httpErrorResponseMapper, httpResponseMapper } = require('./mappers/index');


module.exports = {
  httpErrorResponseController: httpErrorResponseController(httpErrorResponseMapper),
  httpResponseController: httpResponseController(httpResponseMapper),
};
