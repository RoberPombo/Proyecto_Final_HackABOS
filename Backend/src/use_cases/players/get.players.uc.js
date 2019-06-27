'use strict';

// Local imports: use_cases/entities ===============================================================
const { validatePlayerDataEntitie } = require('../entities/validate.player.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { findPlayerRepositorie } = require('../../repositories/players/find.player.repositorie');


const getPlayersUseCase = async(role, sport, playerId, paramPlayerId) => {
  if (role !== 'team' && playerId !== paramPlayerId) {
    throw CreateErrorResponseModel('Forbidden access.', 'get.player.uc.js', {});
  }

  const requiredFields = ['_id'];
  const validId = await validatePlayerDataEntitie({ _id: paramPlayerId }, requiredFields);

  const findedPlayer = await findPlayerRepositorie.byId(validId, sport);

  return CreateResponseModel('Sent player profile.', 'get.players.uc.js', findedPlayer);
};


module.exports = {
  getPlayersUseCase,
};
