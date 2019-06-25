'use strict';

// Local imports: this module ======================================================================
const { httpResponseMapper } = require('./mappers/http.response.mapper');
// Local imports: config ===========================================================================
const { Console } = require('../config/config.winston');


const httpResponseController = async(req, res, next) => {
  if (req.response && req.response.title) {
    const { response } = req;

    const {
      status, title, data, file, redirectTo,
    } = httpResponseMapper(response);

    const {
      init, ip, userAgent, userId,
    } = req.infoReq;
    const time = Date.now() - init;
    Console.debug(`Res: ${title} = File: ${file} = Time:${time}ms = UserId: ${userId} = Ip: ${ip} = Agent: ${userAgent}`);


    if (redirectTo) {
      return res.redirect(302, redirectTo);
    }

    return res.status(status).send({
      title,
      data,
    });
  }
  const err = { title: 'ErrorRoute' };


  return next(err);
};


module.exports = {
  httpResponseController,
};
