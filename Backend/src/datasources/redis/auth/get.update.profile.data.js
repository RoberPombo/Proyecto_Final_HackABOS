'use strict';

// Local imports: this module ======================================================================
const { asyncRedisClient } = require('../connect.redis.db');
// Declared environment variables ==================================================================
const { NODE_ENV: nodeEnv } = process.env;


const getUpdateProfileDatasource = async(userId) => {
  if (nodeEnv === 'dev') await asyncRedisClient.select(2);
  const updatedProfile = await asyncRedisClient.get(userId);

  return JSON.parse(updatedProfile);
};


module.exports = {
  getUpdateProfileDatasource,
};
