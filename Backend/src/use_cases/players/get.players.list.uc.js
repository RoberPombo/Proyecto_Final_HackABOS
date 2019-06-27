'use strict';

// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { findPlayerRepositorie } = require('../../repositories/players/find.player.repositorie');


const getPlayersListUseCase = async(role, sport) => {
  if (role !== 'team') {
    throw CreateErrorResponseModel('Forbidden access.', 'get.player.uc.js', {});
  }

  const findedPlayers = await findPlayerRepositorie.list('', sport);

  return CreateResponseModel('Sent players list.', 'get.players.uc.js', findedPlayers);
};


module.exports = {
  getPlayersListUseCase,
};
