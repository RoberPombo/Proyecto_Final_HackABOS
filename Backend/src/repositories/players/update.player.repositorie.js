'use strict';

// Local imports: datasources ======================================================================
const { updatePlayerDatasource } = require('../../datasources/mongoDb/players/update.player.data');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../../use_cases/models/create.error.response.model');


const updatePlayerRepositorie = option => async(userId, playerId, sport, dataUpdate) => {
  let updatedPlayer;
  try {
    if (option === 'delete') {
      updatedPlayer = await updatePlayerDatasource.delete(userId, playerId, sport, '');
    } else if (option === 'profile') {
      updatedPlayer = await updatePlayerDatasource.profile(userId, playerId, sport, dataUpdate);
    } else if (option === 'addVideo') {
      updatedPlayer = await updatePlayerDatasource.addVideo(userId, playerId, sport, dataUpdate);
    }
  } catch (error) {
    throw CreateErrorResponseModel('Internal server error.', 'update.player.repositorie.js', error);
  }


  return updatedPlayer;
};


module.exports = {
  updatePlayerRepositorie: {
    addVideo: updatePlayerRepositorie('addVideo'),
    delete: updatePlayerRepositorie('delete'),
    profile: updatePlayerRepositorie('profile'),
  },
};
