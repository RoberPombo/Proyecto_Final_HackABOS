'use strict';

// Local imports: use_cases ========================================================================
const { loginUseCase } = require('../../use_cases/auth/login.uc');


const loginController = async(req, _res, next) => {
  const { email, password, sport } = req.body;
  const { ip } = req;
  const userAgent = req.headers['user-agent'];
  try {
    const { response, userId } = await loginUseCase({ email, password, sport }, ip, userAgent);

    req.infoReq = { ...req.infoReq, userId };
    req.response = response;

    return next();
  } catch (error) {
    req.infoReq = { ...req.infoReq, userId: email };

    return next(error);
  }
};


module.exports = {
  loginController,
};
