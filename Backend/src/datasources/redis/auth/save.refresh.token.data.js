'use strict';

// Local imports: this module ======================================================================
const { asyncRedisClient } = require('../connect.redis.db');
// Declared environment variables ==================================================================
const { NODE_ENV: nodeEnv } = process.env;


const saveRefreshTokenDatasource = async(
  uuid,
  userId,
  userEmail,
  role,
  sport,
  playerId = '',
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


  if (nodeEnv === 'dev') await asyncRedisClient.select(1);
  await asyncRedisClient.set(uuid, savedRefreshToken);
  await asyncRedisClient.expire(uuid, expiresIn);


  return true;
};


module.exports = {
  saveRefreshTokenDatasource,
};
