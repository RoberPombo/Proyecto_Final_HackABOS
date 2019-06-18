'use strict';

// Local imports. ==================================================================================
const { checkJwtUseCase } = require('./check.jwt.uc');
const { loginUseCase } = require('./login.uc');
const { refreshTokenUseCase } = require('./refresh.token.uc');
const {
  checkHashPasswordEntitie, checkJwtTokenEntitie, createTokensEntitie, validateUserDataEntitie,
} = require('../entities/index');
const { CreateErrorResponseModel, CreateResponseModel } = require('../models/index');
// Local imports: repositories =====================================================================
const { findUserRepositorie } = require('../../repositories/user/index');
const { getRefreshTokenRepositorie, saveRefreshTokenRepositorie } = require('../../repositories/auth/index');


module.exports = {
  checkJwtUseCase: checkJwtUseCase({
    checkJwtTokenEntitie,
    CreateErrorResponseModel,
  }),
  loginUseCase: loginUseCase({
    checkHashPasswordEntitie,
    CreateErrorResponseModel,
    CreateResponseModel,
    createTokensEntitie,
    findUserByEmail: findUserRepositorie.byEmail,
    saveRefreshTokenRepositorie,
    validateUserDataEntitie,
  }),
  refreshTokenUseCase: refreshTokenUseCase({
    CreateErrorResponseModel,
    CreateResponseModel,
    createTokensEntitie,
    getRefreshTokenRepositorie,
  }),
};
