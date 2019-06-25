'use strict';

// Imported npm modules ================================================
const jwt = require('jsonwebtoken');
// Local imports: this module ======================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
// Declared environment variables ======================================
const { JWT_SEED_TOKEN: jwtSecret } = process.env;


const checkJwtTokenEntitie = async(token) => {
  try {
    return await jwt.verify(token, jwtSecret);
  } catch (error) {
    throw CreateErrorResponseModel('Unauthorized user.', 'check.jwt.token.entitie.js', error);
  }
};


module.exports = {
  checkJwtTokenEntitie,
};
