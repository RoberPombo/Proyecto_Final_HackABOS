'use strict';

// Local imports: use_cases/entities ===============================================================
const { checkJwtTokenEntitie } = require('../entities/check.jwt.token.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');


const checkJwtUseCase = async(authorization) => {
  if (!authorization) throw CreateErrorResponseModel('Unauthorized user.', 'check.jwt.uc.js', {});

  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'Bearer' || !token) throw CreateErrorResponseModel('Unauthorized user.', 'check.jwt.uc.js', {});

  const decoded = await checkJwtTokenEntitie(token);
  if (!decoded && (!decoded.userId || !decoded.role || !decoded.sport)) {
    throw CreateErrorResponseModel('Unauthorized user.', 'check.jwt.uc.js', {});
  }

  return {
    userId: decoded.userId,
    role: decoded.role,
    sport: decoded.sport,
    playerId: decoded.playerId,
  };
};


module.exports = {
  checkJwtUseCase,
};
