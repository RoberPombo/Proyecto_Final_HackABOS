'use strict';


const getUpdateProfileDatasource = asyncRedisClient => async(userId) => {
  await asyncRedisClient.select(2);
  const updatedProfile = await asyncRedisClient.get(userId);

  return JSON.parse(updatedProfile);
};


module.exports = {
  getUpdateProfileDatasource,
};
