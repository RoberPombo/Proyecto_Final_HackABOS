'use strict';

// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { updateUserRepositorie } = require('../../repositories/user/update.user.repositorie');
const { updatePlayerRepositorie } = require('../../repositories/players/update.player.repositorie');


const deleteUserUseCase = async(userId, role, playerId, sport) => {
  const updatedUser = await updateUserRepositorie.delete(userId, sport);
  if (!updatedUser || updatedUser.deletedAt > 0) {
    throw CreateErrorResponseModel('Invalid request data.', 'delete.user.uc.js', {});
  }

  if (role === 'agent') {
    await updatePlayerRepositorie.delete(userId, playerId, sport);
  }

  return CreateResponseModel('Deleted user.', 'delete.user.uc.js', updatedUser);
};


module.exports = {
  deleteUserUseCase,
};
