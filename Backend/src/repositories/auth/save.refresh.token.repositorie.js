'use strict';


const saveRefreshTokenRepositorie = saveRefreshTokenDatasource => async(
  authTokens,
  findedUser,
  ip,
  userAgent,
) => {
  try {
    return await saveRefreshTokenDatasource(
      authTokens.refreshToken,
      findedUser._id,
      findedUser.email,
      findedUser.role,
      findedUser.sport,
      findedUser.agentOf.playerId,
      ip,
      userAgent,
      findedUser.createdAt,
      findedUser.deletedAt,
      authTokens.refreshExpiresIn,
    );
  } catch (e) {
    return new Error('Internal server error.');
  }
};


module.exports = {
  saveRefreshTokenRepositorie,
};
