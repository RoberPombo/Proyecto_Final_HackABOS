'use strict';

// Local imports. ==================================================================================
const { languageOptions } = require('../../config/index');


const createUserController = createUserUseCase => async(req, _res, next) => {
  const { email, password } = req.body;
  const language = req.acceptsLanguages(languageOptions) || 'en';


  const response = await createUserUseCase({
    email,
    password,
    language,
  });
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  createUserController,
};
