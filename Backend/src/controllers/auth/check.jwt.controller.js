'use strict';

// Local imports: use_cases ========================================================================
const { checkJwtUseCase } = require('../../use_cases/auth/check.jwt.uc');


const checkJwtController = async(req, _res, next) => {
  try {
    const { authorization } = req.headers;

    const claims = await checkJwtUseCase(authorization);

    req.infoReq = { ...req.infoReq, userId: claims.userId };
    req.claims = claims;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  checkJwtController,
};
