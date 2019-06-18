'use strict';

// Declared environment variables ==================================================================
const { REFRESH_EXP_TOKEN: expiresIn } = process.env;


const saveUpdateProfileDatasource = (
  asyncRedisClient,
  getUpdateProfileDatasource,
) => async(
  userId,
  dataUpdate,
) => {
  const getProfile = await getUpdateProfileDatasource(userId);


  const role = (dataUpdate && dataUpdate.role) ? dataUpdate.role : getProfile.role;
  const sport = (dataUpdate && dataUpdate.sport) ? dataUpdate.sport : getProfile.sport;
  const playerId = (dataUpdate && dataUpdate.playerId)
    ? dataUpdate.playerId : getProfile.playerId;
  const deletedAt = (dataUpdate && dataUpdate.deletedAt)
    ? dataUpdate.deletedAt : getProfile.deletedAt;


  const savedUpdateProfile = JSON.stringify({
    role: role || undefined,
    sport: sport || undefined,
    playerId: playerId || undefined,
    deletedAt: deletedAt || undefined,
  });


  await asyncRedisClient.select(2);
  await asyncRedisClient.set(userId, savedUpdateProfile);
  await asyncRedisClient.expire(userId, expiresIn);


  return true;
};


module.exports = {
  saveUpdateProfileDatasource,
};
