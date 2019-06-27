'use strict';

// Local imports: use_cases/entities ===============================================================
const { validateUserDataEntitie } = require('../entities/validate.user.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { updateUserRepositorie } = require('../../repositories/user/update.user.repositorie');


const addFavouritePlayerUseCase = async(userId, sport, role, playerData) => {
  if (role !== 'team') throw CreateErrorResponseModel('Forbidden access.', 'add.favourite.video.uc.js', {});

  const requiredFields = ['favoritePlayers'];
  const validInputData = await validateUserDataEntitie(
    { favoritePlayers: [playerData] },
    requiredFields
  );

  const addFavoritePlayer = await updateUserRepositorie.addFavoritePlayer(
    userId, sport, validInputData
  );
  if (!addFavoritePlayer) throw CreateErrorResponseModel('Player has already been added.', 'add.favourite.player.uc.js', {});


  return CreateResponseModel('Added favourite player.', 'add.favourite.player.uc.js', addFavoritePlayer);
};


module.exports = {
  addFavouritePlayerUseCase,
};
