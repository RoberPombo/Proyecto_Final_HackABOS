'use strict';

// Local imports: use_cases/entities ===============================================================
const { validateUserDataEntitie } = require('../entities/validate.user.data.entitie');
const { checkHashPasswordEntitie } = require('../entities/hash.password.entitie');
const { createTokensEntitie } = require('../entities/create.tokens.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { findUserRepositorie } = require('../../repositories/user/find.user.repositorie');
const { saveRefreshTokenRepositorie } = require('../../repositories/auth/save.refresh.token.repositorie');


const loginUseCase = async(inputData, ip, userAgent) => {
  const requiredFields = ['email', 'password', 'sport'];
  const validInputData = await validateUserDataEntitie(inputData, requiredFields);

  const findedUser = await findUserRepositorie.byEmail(validInputData.email, validInputData.sport);
  if (findedUser[0].activatedAt === 0) {
    throw CreateErrorResponseModel('User is not activated.', 'find.user.repositorie.js', findedUser);
  }

  if (!checkHashPasswordEntitie(validInputData.password, findedUser[0].password)) {
    throw CreateErrorResponseModel('Wrong email o password.', 'find.user.repositorie.js', {});
  }

  const authTokens = await createTokensEntitie({
    userId: findedUser[0]._id,
    role: findedUser[0].role,
    sport: findedUser[0].sport,
    playerId: (findedUser[0].agentOf && findedUser[0].agentOf.playerId) ? findedUser[0].agentOf.playerId : '',
  });

  await saveRefreshTokenRepositorie(authTokens, findedUser[0], ip, userAgent);

  return {
    response: CreateResponseModel('User is authenticated.', 'login.uc.js', authTokens),
    userId: findedUser[0]._id,
  };
};


module.exports = {
  loginUseCase,
};
