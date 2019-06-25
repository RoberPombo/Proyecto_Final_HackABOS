'use strict';

// Local imports: datasources ======================================================================
const { saveRefreshTokenDatasource } = require('../../datasources/redis/auth/save.refresh.token.data');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../../use_cases/models/create.error.response.model');


const saveRefreshTokenRepositorie = async(
  authTokens,
  findedUser,
  ip,
  userAgent,
) => {
  try {
    const playerId = (findedUser.agentOf && findedUser.agentOf.playerId) ? findedUser.agentOf.playerId : '';

    return await saveRefreshTokenDatasource(
      authTokens.refreshToken,
      findedUser._id,
      findedUser.email,
      findedUser.role,
      findedUser.sport,
      playerId,
      ip,
      userAgent,
      findedUser.createdAt,
      findedUser.deletedAt,
      authTokens.refreshExpiresIn,
    );
  } catch (error) {
    throw CreateErrorResponseModel('Internal server error.', 'save.refresh.token.repositorie.js', error);
  }
};


module.exports = {
  saveRefreshTokenRepositorie,
};
