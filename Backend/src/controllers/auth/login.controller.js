'use strict';


const loginController = loginUseCase => async(req, _res, next) => {
  const { email, password } = req.body;
  const { ip } = req;
  const userAgent = req.headers['user-agent'];


  const response = await loginUseCase({ email, password }, ip, userAgent);
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  loginController,
};
