'use strict';


// Local imports: this module ======================================================================
const { checkJwtController } = require('./check.jwt.controller');
const { loginController } = require('./login.controller');
const { refreshTokenController } = require('./refresh.token.controller');
// Local imports: use_cases ========================================================================
const {
  checkJwtUseCase,
  loginUseCase,
  refreshTokenUseCase,
} = require('../../use_cases/auth/index');


module.exports = {
  checkJwtController: checkJwtController(checkJwtUseCase),
  loginController: loginController(loginUseCase),
  refreshTokenController: refreshTokenController(refreshTokenUseCase),
};
