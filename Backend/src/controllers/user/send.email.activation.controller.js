'use strict';


const sendEmailActivationController = sendEmailActivationUseCase => async(req, res, next) => {
  const { email } = req.body;

  const response = await sendEmailActivationUseCase(email);

  if (response instanceof Error) return next(response);

  req.response = response;

  return next();
};


module.exports = {
  sendEmailActivationController,
};
