'use strict';

// Local imports: datasources ======================================================================
const { savePlayerDatasource } = require('../../datasources/mongoDb/players/save.player.data');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../../use_cases/models/create.error.response.model');


const savePlayerRepositorie = async(playerData) => {
  try {
    return await savePlayerDatasource(playerData);
  } catch (error) {
    if (error.message.includes('dup key')) {
      throw CreateErrorResponseModel('Player already exists in database.', 'save.player.repositorie.js', error);
    } else if (error.message === 'Forbidden access.') {
      throw CreateErrorResponseModel('Forbidden access.', 'save.player.repositorie.js', error);
    }
    throw CreateErrorResponseModel('Internal server error.', 'save.player.repositorie.js', error);
  }
};


module.exports = {
  savePlayerRepositorie,
};
