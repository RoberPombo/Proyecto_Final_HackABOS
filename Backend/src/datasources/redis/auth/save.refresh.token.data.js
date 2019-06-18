'use strict';


const saveRefreshTokenDatasource = asyncRedisClient => async(
  uuid,
  userId,
  userEmail,
  role,
  sport,
  playerId,
  ip,
  userAgent,
  createdAt,
  deletedAt,
  expiresIn,
) => {
  const savedRefreshToken = JSON.stringify({
    uuid,
    userId,
    userEmail,
    role,
    sport,
    playerId,
    ip,
    userAgent,
    createdAt,
    deletedAt,
  });
  await asyncRedisClient.select(1);
  await asyncRedisClient.set(uuid, savedRefreshToken);
  await asyncRedisClient.expire(uuid, expiresIn);
  return true;
};


module.exports = {
  saveRefreshTokenDatasource,
};
