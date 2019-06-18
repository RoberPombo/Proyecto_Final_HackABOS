'use strict';


const confirmChangeUserPasswordController = confirmChangeUserPasswordUseCase => async(
  req, _res, next
) => {
  const confirmCode = req.query.confirm_code;


  const response = await confirmChangeUserPasswordUseCase(confirmCode);
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  confirmChangeUserPasswordController,
};
