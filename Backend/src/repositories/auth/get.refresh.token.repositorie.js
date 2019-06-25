'use strict';

// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../../use_cases/models/create.error.response.model');
// Local imports: datasources ======================================================================
const { getRefreshTokenDatasource } = require('../../datasources/redis/auth//get.refresh.token.data');


const getRefreshTokenRepositorie = async(refreshToken) => {
  try {
    return await getRefreshTokenDatasource(refreshToken);
  } catch (error) {
    throw CreateErrorResponseModel('Internal server error.', 'get.refresh.token.repositorie.js', error);
  }
};


module.exports = {
  getRefreshTokenRepositorie,
};
