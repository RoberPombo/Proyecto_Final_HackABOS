'use strict';


const deletePlayerUseCase = ({
  CreateErrorResponseModel,
  CreateResponseModel,
  deletePlayerRepositorie,
}) => async(userId, role, sport, playerId, paramPlayerId) => {
  if (role !== 'scout' || playerId !== paramPlayerId) {
    return CreateErrorResponseModel('Unauthorized user.', []);
  }
  if (!userId || !playerId || !sport) {
    return CreateErrorResponseModel('Unauthorized user.', []);
  }


  const updatedPlayer = await deletePlayerRepositorie(userId, playerId, sport);
  if (updatedPlayer instanceof Error) {
    return CreateErrorResponseModel(updatedPlayer.message, updatedPlayer);
  }
  if (updatedPlayer.deletedAt > 0) {
    return CreateErrorResponseModel('Invalid request data.', []);
  }


  return CreateResponseModel('Deleted player.', []);
};


module.exports = {
  deletePlayerUseCase,
};
