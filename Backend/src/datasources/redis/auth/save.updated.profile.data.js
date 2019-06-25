'use strict';

/* eslint-disable no-nested-ternary */

// Local imports: this module ======================================================================
const { asyncRedisClient } = require('../connect.redis.db');
const { getUpdateProfileDatasource } = require('./get.update.profile.data');
// Declared environment variables ==================================================================
const { REFRESH_EXP_TOKEN: expiresIn, NODE_ENV: nodeEnv } = process.env;


const saveUpdateProfileDatasource = async(
  userId,
  dataUpdate,
) => {
  const getProfile = await getUpdateProfileDatasource(userId);


  const role = (dataUpdate && dataUpdate.role) ? dataUpdate.role : ((getProfile && getProfile.role) ? getProfile.role : '');
  const sport = (dataUpdate && dataUpdate.sport) ? dataUpdate.sport : ((getProfile && getProfile.sport) ? getProfile.sport : '');
  const playerId = (dataUpdate && dataUpdate.playerId)
    ? dataUpdate.playerId : ((getProfile && getProfile.playerId) ? getProfile.playerId : '');
  const deletedAt = (dataUpdate && dataUpdate.deletedAt)
    ? dataUpdate.deletedAt : ((getProfile && getProfile.deletedAt) ? getProfile.deletedAt : '');


  const savedUpdateProfile = JSON.stringify({
    role: role || undefined,
    sport: sport || undefined,
    playerId: playerId || undefined,
    deletedAt: deletedAt || undefined,
  });


  if (nodeEnv === 'dev') await asyncRedisClient.select(2);
  await asyncRedisClient.set(userId, savedUpdateProfile);
  await asyncRedisClient.expire(userId, expiresIn);


  return true;
};


module.exports = {
  saveUpdateProfileDatasource,
};
