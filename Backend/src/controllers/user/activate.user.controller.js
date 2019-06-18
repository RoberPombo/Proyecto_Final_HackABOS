'use strict';


const { URL_FRONT:urlFront } = process.env;


const activateUserController = activateUserUseCase => async(req, res) => {
  const activationCode = req.query.activation_code;


  const response = await activateUserUseCase(activationCode);
  if (response instanceof Error) return next(response);


  return res.redirect(302, urlFront);
};


module.exports = {
  activateUserController,
};
