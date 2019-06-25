'use strict';

// Local imports: use_cases ========================================================================
const { changeUserPasswordUseCase } = require('../../use_cases/user/change.user.password.uc');


const changeUserPasswordController = async(req, res, next) => {
  const { email, password, sport } = req.body;

  try {
    const response = await changeUserPasswordUseCase(email, password, sport);

    req.infoReq = { ...req.infoReq, userId: response.data._id };
    req.response = response;

    return next();
  } catch (error) {
    req.infoReq = { ...req.infoReq, userId: email };

    return next(error);
  }
};


module.exports = {
  changeUserPasswordController,
};
