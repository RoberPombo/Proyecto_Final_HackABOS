'use strict';

// Local imports: use_cases ========================================================================
const { sendEmailActivationUseCase } = require('../../use_cases/user/send.email.activation.uc');


const sendEmailActivationController = async(req, res, next) => {
  const { email, sport } = req.body;

  try {
    const response = await sendEmailActivationUseCase(email, sport);

    req.infoReq = { ...req.infoReq, userId: response.data._id };
    req.response = response;

    return next();
  } catch (error) {
    req.infoReq = { ...req.infoReq, userId: email };

    return next(error);
  }
};


module.exports = {
  sendEmailActivationController,
};
