'use strict';


const infoRequestController = (req, _res, next) => {
  const { ip } = req;
  const userAgent = req.headers['user-agent'];

  req.infoReq = {
    ip,
    userAgent,
    init: Date.now(),
  };

  next();
};


module.exports = {
  infoRequestController,
};
