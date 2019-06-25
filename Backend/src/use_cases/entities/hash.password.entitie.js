'use strict';

// Imports modules npm. ============================================================================
const bcrypt = require('bcrypt');


const checkHashPasswordEntitie = (
  password,
  hashPassword,
) => bcrypt.compareSync(password, hashPassword);


const createHashPasswordEntitie = password => bcrypt.hashSync(password, 10);


module.exports = {
  checkHashPasswordEntitie,
  createHashPasswordEntitie,
};
