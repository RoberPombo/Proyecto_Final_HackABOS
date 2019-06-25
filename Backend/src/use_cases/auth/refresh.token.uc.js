'use strict';

// Local imports: use_cases/entities ===============================================================
const { createTokensEntitie } = require('../entities/create.tokens.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { getRefreshTokenRepositorie } = require('../../repositories/auth/get.refresh.token.repositorie');


const refreshTokenUseCase = async(refreshToken, ip, userAgent) => {
  if (!refreshToken) {
    throw CreateErrorResponseModel('Unauthorized refresh token.', 'refresh.token.uc.js', {});
  }

  const findedRefreshToken = await getRefreshTokenRepositorie(refreshToken);
  if (!findedRefreshToken || findedRefreshToken.deletedAt > 0) {
    throw CreateErrorResponseModel('Unauthorized refresh token.', 'refresh.token.uc.js', {});
  }
  if (findedRefreshToken.ip !== ip || findedRefreshToken.userAgent !== userAgent) {
    throw CreateErrorResponseModel('Unauthorized refresh token.', 'refresh.token.uc.js', {});
  }


  const {
    jwtToken, jwtExpiresIn, refreshExpiresIn,
  } = await createTokensEntitie({
    userId: findedRefreshToken.userId,
    role: findedRefreshToken.role,
    sport: findedRefreshToken.sport,
    playerId: findedRefreshToken.playerId,
  });


  return {
    response: CreateResponseModel('User authentication is refreshed.', 'refresh.token.uc.js', {
      jwtToken,
      jwtExpiresIn,
      refreshToken,
      refreshExpiresIn,
    }),
    userId: findedRefreshToken.userId,
  };
};


module.exports = {
  refreshTokenUseCase,
};
