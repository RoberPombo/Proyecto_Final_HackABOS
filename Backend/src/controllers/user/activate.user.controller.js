'use strict';

// Local imports: use_cases ========================================================================
const { activateUserUseCase } = require('../../use_cases/user/activate.user.uc');


const activateUserController = async(req, res, next) => {
  const { activation_code: activationCode, sport } = req.query;

  try {
    const response = await activateUserUseCase(activationCode, sport);

    req.infoReq = { ...req.infoReq, userId: response.data._id };
    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  activateUserController,
};
