'use strict';


const getRefreshTokenDatasource = (
  asyncRedisClient,
  getUpdateProfileDatasource,
) => async(uuid) => {
  // await asyncRedisClient.select(1);
  const refreshToken = JSON.parse(await asyncRedisClient.get(uuid));

  const getProfile = await getUpdateProfileDatasource(refreshToken.userId);


  return {
    uuid: refreshToken.uuid,
    userId: refreshToken.userId,
    userEmail: refreshToken.userEmail,
    role: (getProfile && getProfile.role) ? getProfile.role : refreshToken.role,
    sport: (getProfile && getProfile.sport) ? getProfile.sport : refreshToken.sport,
    playerId: (getProfile && getProfile.playerId) ? getProfile.playerId : refreshToken.playerId,
    userAgent: refreshToken.userAgent,
    ip: refreshToken.ip,
    createdAt: refreshToken.createdAt,
    deletedAt: (getProfile && getProfile.deletedAt) ? getProfile.deletedAt : refreshToken.deletedAt,
  };
};


module.exports = {
  getRefreshTokenDatasource,
};
