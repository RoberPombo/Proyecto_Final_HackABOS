'use strict';

// Imports modules npm. ============================================================================
const mongoose = require('mongoose');
// Declared environment variables ==================================================================
const mongoDbUrl = (process.env.NODE_ENV === 'dev') ? process.env.MONGODB_URL_DEV : process.env.MONGODB_URL;


const connectMongoDb = async() => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10,
  };

  try {
    const conn = await mongoose.connect(mongoDbUrl, options);

    return conn;
  } catch (e) {
    return e;
  }
};

module.exports = {
  connectMongoDb,
};
