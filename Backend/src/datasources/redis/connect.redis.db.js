'use strict';

// Imports modules npm. ============================================================================
const asyncRedis = require('async-redis');
// Declared environment variables ==================================================================
const {
  REDISCLOUD_URL: redisCloudUrl,
} = process.env;


const asyncRedisClient = asyncRedis.createClient(redisCloudUrl, { no_ready_check: true });


asyncRedisClient.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});


module.exports = {
  asyncRedisClient,
};
