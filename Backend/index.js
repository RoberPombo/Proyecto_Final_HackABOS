'use strict';

// Declared environment variables ==================================================================
// Local imports: this module ======================================================================

// Imports modules npm. ============================================================================
require('dotenv').config();
// Local imports. ==================================================================================
const { Console } = require('./src/config/config.winston');
const { connectMongoDb } = require('./src/datasources/mongoDb/connect.mongo.db');
const { asyncRedisClient } = require('./src/datasources/redis/connect.redis.db');
const { startServer } = require('./src/server');


process.on('uncaughtException', (error) => {
  Console.error(`uncaughtException: ${error}`);
});
process.on('unhandledRejection', (error) => {
  Console.error(`unhandledRejection: ${error}`);
});


(async() => {
  try {
    await asyncRedisClient.startServer;
    Console.log('Redis connect.');

    await connectMongoDb();
    Console.log('MongoDB connect.');

    await startServer();
  } catch (e) {
    Console.error(e);
    process.exit(1);
  }
})();
