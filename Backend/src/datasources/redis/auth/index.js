'use strict';

// Local imports: this module ======================================================================
const { getRefreshTokenDatasource } = require('./get.refresh.token.data');
const { getUpdateProfileDatasource } = require('./get.update.profile.data');
const { saveRefreshTokenDatasource } = require('./save.refresh.token.data');
const { saveUpdateProfileDatasource } = require('./save.updated.profile.data');
const { asyncRedisClient } = require('../index');


module.exports = {
  getRefreshTokenDatasource: getRefreshTokenDatasource(
    asyncRedisClient,
    getUpdateProfileDatasource(asyncRedisClient),
  ),
  getUpdateProfileDatasource: getUpdateProfileDatasource(asyncRedisClient),
  saveUpdateProfileDatasource: saveUpdateProfileDatasource(
    asyncRedisClient,
    getUpdateProfileDatasource(asyncRedisClient),
  ),
  saveRefreshTokenDatasource: saveRefreshTokenDatasource(asyncRedisClient),
};
