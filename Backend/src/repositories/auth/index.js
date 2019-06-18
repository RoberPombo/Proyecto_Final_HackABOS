'use strict';

// Local imports: this module ======================================================================
const { getRefreshTokenRepositorie } = require('./get.refresh.token.repositorie');
const { saveRefreshTokenRepositorie } = require('./save.refresh.token.repositorie');
// Local imports: datasources ======================================================================
const {
  getRefreshTokenDatasource,
  saveRefreshTokenDatasource,
} = require('../../datasources/redis/auth/index');


module.exports = {
  getRefreshTokenRepositorie: getRefreshTokenRepositorie(getRefreshTokenDatasource),
  saveRefreshTokenRepositorie: saveRefreshTokenRepositorie(saveRefreshTokenDatasource),
};
