'use strict';

// Local imports: use_cases/entities ===============================================================
const { validatePlayerDataEntitie } = require('../entities/validate.player.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { updatePlayerRepositorie } = require('../../repositories/players/update.player.repositorie');


const updatePlayerProfileUseCase = async(
  userId, role, sport, playerId, paramPlayerId, playerProfile
) => {
  if (role !== 'agent' || playerId !== paramPlayerId) {
    throw CreateErrorResponseModel('Forbidden access.', 'update.player.profile.uc.js', {});
  }
  if (!userId || !sport) throw CreateErrorResponseModel('Unauthorized user.', 'update.player.profile.uc.js', {});

  const requiredFields = ['fullName', 'birthdate', 'nationality', 'height', 'weight', 'team', 'preferredFoot', 'preferredPositions'];
  const validatedPlayerProfile = await validatePlayerDataEntitie(playerProfile, requiredFields);

  const updatedPlayer = await updatePlayerRepositorie.profile(userId, playerId, sport, validatedPlayerProfile);


  return CreateResponseModel('Updated player.', 'update.player.profile.uc.js', updatedPlayer);
};


module.exports = {
  updatePlayerProfileUseCase,
};
