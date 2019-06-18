'use strict';

// Imported npm modules ================================================
const jwt = require('jsonwebtoken');
// Declared environment variables ======================================
const { JWT_SEED_TOKEN: jwtSecret } = process.env;


/**
 * @type {IcheckJwtTokenEntitie}
 */
const checkJwtTokenEntitie = async(token) => {
  try {
    return await jwt.verify(token, jwtSecret);
  } catch (e) {
    return new Error('Unauthorized user.');
  }
};


module.exports = {
  checkJwtTokenEntitie,
};
