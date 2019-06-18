'use strict';

// Imports modules npm. ============================================================================
const asyncRedis = require('async-redis');
// Declared environment variables ==================================================================
const {
  REDIS_HOST: redisHost,
  REDIS_PORT: redisPort,
  REDIS_PASSWORD: redisPassword,
} = process.env;


const asyncRedisClient = asyncRedis.createClient({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
});


asyncRedisClient.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});


module.exports = {
  asyncRedisClient,
};
