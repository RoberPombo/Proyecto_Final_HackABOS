'use strict';

// Local imports: use_cases ========================================================================
const { confirmChangeUserPasswordUseCase } = require('../../use_cases/user/confirm.change.user.password.uc');


const confirmChangeUserPasswordController = async(req, _res, next) => {
  const { confirm_code: confirmCode, sport } = req.query;

  try {
    const response = await confirmChangeUserPasswordUseCase(confirmCode, sport);

    req.infoReq = { ...req.infoReq, userId: response.data._id };
    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  confirmChangeUserPasswordController,
};
