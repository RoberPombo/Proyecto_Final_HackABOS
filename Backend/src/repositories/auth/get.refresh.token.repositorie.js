'use strict';


const getRefreshTokenRepositorie = getRefreshTokenDatasource => async(refreshToken) => {
  try {
    return await getRefreshTokenDatasource(refreshToken);
  } catch (e) {
    return new Error('Internal server error.');
  }
};


module.exports = {
  getRefreshTokenRepositorie,
};
