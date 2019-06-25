'use strict';

// Local imports: use_cases ========================================================================
const { refreshTokenUseCase } = require('../../use_cases/auth/refresh.token.uc');


const refreshTokenController = async(req, _res, next) => {
  const { ip } = req;
  const userAgent = req.headers['user-agent'];
  const refreshToken = req.headers['x-refreshtoken'];

  try {
    const { response, userId } = await refreshTokenUseCase(refreshToken, ip, userAgent);

    req.infoReq = { ...req.infoReq, userId };
    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  refreshTokenController,
};
