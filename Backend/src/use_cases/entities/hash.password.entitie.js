'use strict';

// Imports modules npm. ============================================================================
const bcrypt = require('bcrypt');


/**
 * @type {IcheckHashPasswordEntitie}
 */
const checkHashPasswordEntitie = (
  password,
  hashPassword,
) => bcrypt.compareSync(password, hashPassword);


/**
 * @type {IcreateHashPasswordEntitie}
 */
const createHashPasswordEntitie = password => bcrypt.hashSync(password, 10);


module.exports = {
  checkHashPasswordEntitie,
  createHashPasswordEntitie,
};
