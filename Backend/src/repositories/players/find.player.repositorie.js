'use strict';

// Local imports: datasources ======================================================================
const { findPlayerDatasource } = require('../../datasources/mongoDb/players/find.player.data');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../../use_cases/models/create.error.response.model');


const findPlayerRepositorie = option => async(filterValue, sport) => {
  let findedPlayer;
  try {
    if (option === 'id') {
      findedPlayer = await findPlayerDatasource.byId(filterValue, sport);
    }
  } catch (error) {
    if (error.message.includes('Object failed')) {
      throw CreateErrorResponseModel('Invalid request data.', 'find.player.repositorie.js', error);
    }
    throw CreateErrorResponseModel('Internal server error.', 'find.player.repositorie.js', error);
  }

  if (findedPlayer.length === 0) {
    throw CreateErrorResponseModel('Invalid request data.', 'find.player.repositorie.js', findedPlayer);
  }

  return findedPlayer;
};


module.exports = {
  findPlayerRepositorie: {
    byId: findPlayerRepositorie('id'),
  },
};
