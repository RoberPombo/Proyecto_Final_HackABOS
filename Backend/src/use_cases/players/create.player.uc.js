'use strict';

// Local imports: use_cases/entities ===============================================================
const { validatePlayerDataEntitie } = require('../entities/validate.player.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
const { CreatePlayerModel } = require('../models/create.player.model');
// Local imports: repositories =====================================================================
const { savePlayerRepositorie } = require('../../repositories/players/save.player.repositorie');
const { updateUserRepositorie } = require('../../repositories/user/update.user.repositorie');


const createPlayerUseCase = async(userId, role, sport, inputData) => {
  if (role !== 'user') throw CreateErrorResponseModel('Forbidden access.', 'create.player.uc.js', {});

  const requiredFields = ['fullName', 'birthdate', 'nationality', 'height', 'weight', 'team', 'preferredFoot', 'preferredPositions'];
  const validInputData = await validatePlayerDataEntitie(inputData, requiredFields);

  const newPlayer = CreatePlayerModel(userId, sport, validInputData);

  const savedPlayer = await savePlayerRepositorie(newPlayer);

  await updateUserRepositorie.addPlayer(userId, sport, savedPlayer);

  return CreateResponseModel('Created player.', 'create.player.uc.js', savedPlayer);
};


module.exports = {
  createPlayerUseCase,
};
