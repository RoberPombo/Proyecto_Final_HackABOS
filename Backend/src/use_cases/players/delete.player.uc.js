'use strict';

// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { updatePlayerRepositorie } = require('../../repositories/players/update.player.repositorie');


const deletePlayerUseCase = async(userId, role, sport, playerId, paramPlayerId) => {
  if (role !== 'agent' || playerId !== paramPlayerId) {
    return CreateErrorResponseModel('Unauthorized user.', 'delete.player.uc.js', {});
  }
  if (!userId || !playerId || !sport) {
    return CreateErrorResponseModel('Unauthorized user.', 'delete.player.uc.js', {});
  }


  const updatedPlayer = await updatePlayerRepositorie.delete(userId, playerId, sport);
  if (updatedPlayer.deletedAt > 0) {
    return CreateErrorResponseModel('Invalid request data.', 'delete.player.uc.js', {});
  }

  return CreateResponseModel('Deleted player.', 'delete.player.uc.js', {});
};


module.exports = {
  deletePlayerUseCase,
};
