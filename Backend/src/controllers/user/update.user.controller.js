'use strict';

// Local imports: use_cases ========================================================================
const { updateUserProfileUseCase } = require('../../use_cases/user/update.user.uc');


const updateUserProfileController = async(req, _res, next) => {
  const userProfile = req.body;
  const { userId, sport } = req.claims;

  req.infoReq = { ...req.infoReq, userId };

  try {
    const response = await updateUserProfileUseCase(userId, sport, userProfile);

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  updateUserProfileController,
};
