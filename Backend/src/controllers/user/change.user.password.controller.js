'use strict';


const changeUserPasswordController = changeUserPasswordUseCase => async(req, res, next) => {
  const { email, password } = req.body;


  const response = await changeUserPasswordUseCase({ email, password });
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  changeUserPasswordController,
};
