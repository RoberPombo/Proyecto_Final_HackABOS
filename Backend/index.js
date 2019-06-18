'use strict';

// Imports modules npm. ============================================================================
require('dotenv').config();
// Local imports. ==================================================================================
const { connectMongoDb } = require('./src/datasources/mongoDb/index');
const { asyncRedisClient } = require('./src/datasources/redis/index');
const { startServer } = require('./src/server');


process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error);
});
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});


(async() => {
  try {
    await asyncRedisClient.startServer;
    console.log('Redis connect.');

    await connectMongoDb();
    console.log('MongoDB connect.');

    await startServer();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
