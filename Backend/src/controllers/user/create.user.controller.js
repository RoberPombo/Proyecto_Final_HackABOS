'use strict';

// Local imports: config ===========================================================================
const { languageOptions } = require('../../config/config.api');
// Local imports: use_cases ========================================================================
const { createUserUseCase } = require('../../use_cases/user/create.user.uc');


const createUserController = async(req, _res, next) => {
  const { email, password, sport } = req.body;
  const language = req.acceptsLanguages(languageOptions) || 'en';

  try {
    const response = await createUserUseCase(email, password, sport, language);

    req.infoReq = { ...req.infoReq, userId: response.data._id };
    req.response = response;

    return next();
  } catch (error) {
    req.infoReq = { ...req.infoReq, userId: email };

    return next(error);
  }
};


module.exports = {
  createUserController,
};
