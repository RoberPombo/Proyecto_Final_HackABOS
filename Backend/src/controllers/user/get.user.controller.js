'use strict';

// Local imports: use_cases ========================================================================
const { getUserProfileUseCase } = require('../../use_cases/user/get.user.uc');


const getUserProfileController = async(req, res, next) => {
  const { userId, sport } = req.claims;

  req.infoReq = { ...req.infoReq, userId };

  try {
    const response = await getUserProfileUseCase(userId, sport);

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  getUserProfileController,
};
