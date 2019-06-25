'use strict';

// Local imports: this module ======================================================================
const { httpErrorResponseMapper } = require('./mappers/http.error.response.mapper');
// Local imports: config ===========================================================================
const { Console } = require('../config/config.winston');


// eslint-disable-next-line no-unused-vars
const httpErrorResponseController = async(err, req, res, next) => {
  if (err.title === 'ErrorRoute') {
    return res.status(400).send('The requested routing does not exist.');
  }

  const {
    status, title, file, message, data, redirectTo,
  } = httpErrorResponseMapper(err);

  const {
    init, ip, userAgent, userId,
  } = req.infoReq;
  const time = Date.now() - init;
  Console.error(`Error: ${message} = File: ${file} = Time: ${time}ms = UserId: ${userId || ''} = Ip: ${ip} = Agent: ${userAgent}`);


  if (redirectTo) {
    return res.redirect(302, redirectTo);
  }

  return res.status(status).send({
    title,
    message,
    data,
  });
};


module.exports = {
  httpErrorResponseController,
};
