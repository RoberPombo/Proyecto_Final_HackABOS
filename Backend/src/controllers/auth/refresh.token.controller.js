'use strict';


const refreshTokenController = refreshTokenUseCase => async(req, _res, next) => {
  const { ip } = req;
  const userAgent = req.headers['user-agent'];
  const refreshToken = req.headers['x-refreshtoken'];


  const response = await refreshTokenUseCase(refreshToken, ip, userAgent);
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  refreshTokenController,
};
