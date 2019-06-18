'use strict';


const checkJwtController = checkJwtUseCase => async(req, _res, next) => {
  const { authorization } = req.headers;


  const claims = await checkJwtUseCase(authorization);
  if (claims instanceof Error) return next(claims);


  req.claims = claims;
  return next();
};


module.exports = {
  checkJwtController,
};
