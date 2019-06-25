'use strict';

// Imports modules npm. ============================================================================
const jwt = require('jsonwebtoken');
// Local imports: this module ======================================================================
const { createUuidV4Entitie } = require('./create.uuid.v4.entitie');
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
// Declared environment variables ==================================================================
const {
  JWT_SEED_TOKEN: jwtSecret,
  JWT_EXP_TOKEN: jwtExpiresIn,
  REFRESH_EXP_TOKEN: refreshExpiresIn,
} = process.env;


const createTokensEntitie = async(infoUser) => {
  try {
    const jwtToken = await jwt.sign(
      infoUser,
      jwtSecret,
      { expiresIn: parseInt(jwtExpiresIn, 10) }
    );


    const refreshToken = createUuidV4Entitie();


    return {
      jwtToken,
      jwtExpiresIn: parseInt(jwtExpiresIn, 10),
      refreshToken,
      refreshExpiresIn: parseInt(refreshExpiresIn, 10),
    };
  } catch (error) {
    throw CreateErrorResponseModel('Internal server error.', 'create.tokens.entitie.js', error);
  }
};


module.exports = {
  createTokensEntitie,
};
