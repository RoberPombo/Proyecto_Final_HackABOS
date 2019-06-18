'use strict';

// Imported npm modules ================================================
const jwt = require('jsonwebtoken');
// Declared environment variables ======================================
const {
  JWT_SEED_TOKEN: jwtSecret,
  JWT_EXP_TOKEN: jwtExpiresIn,
  REFRESH_EXP_TOKEN: refreshExpiresIn,
} = process.env;


/**
 * @param {IcreateUuidV4Entitie} createUuidV4Entitie
 *
 * @returns {IcreateTokensEntitie}
 */
const createTokensEntitie = createUuidV4Entitie => async(infoUser) => {
  try {
    const jwtToken = await jwt.sign(
      infoUser,
      jwtSecret,
      { expiresIn: parseInt(jwtExpiresIn, 10) }
    );
    const refreshToken = createUuidV4Entitie();

    return {
      jwtToken: jwtToken,
      jwtExpiresIn: parseInt(jwtExpiresIn, 10),
      refreshToken,
      refreshExpiresIn: parseInt(refreshExpiresIn, 10),
    };
  } catch (e) {
    return new Error('Internal server error.');
  }
};


module.exports = {
  createTokensEntitie,
};
