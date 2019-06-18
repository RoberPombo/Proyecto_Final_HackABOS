'use strict';


const refreshTokenUseCase = ({
  CreateErrorResponseModel,
  CreateResponseModel,
  createTokensEntitie,
  getRefreshTokenRepositorie,
}) => async(refreshToken, ip, userAgent) => {
  const findedRefreshToken = await getRefreshTokenRepositorie(refreshToken);
  if (!findedRefreshToken || findedRefreshToken.deletedAt > 0) {
    return CreateErrorResponseModel('Unauthorized user.', []);
  }
  if (findedRefreshToken.ip !== ip || findedRefreshToken.userAgent !== userAgent) {
    return CreateErrorResponseModel('Unauthorized user.', []);
  }


  const {
    jwtToken, jwtExpiresIn, refreshExpiresIn,
  } = await createTokensEntitie({
    userId: findedRefreshToken.userId,
    role: findedRefreshToken.role,
    sport: findedRefreshToken.sport,
    playerId: findedRefreshToken.playerId,
  });

  return CreateResponseModel('User is authenticated.', [{
    jwtToken,
    jwtExpiresIn,
    refreshToken,
    refreshExpiresIn,
  }]);
};


module.exports = {
  refreshTokenUseCase,
};
