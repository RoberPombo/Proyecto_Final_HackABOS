'use strict';


const updatePlayerProfileUseCase = ({
  validatePlayerDataEntitie,
  CreateErrorResponseModel,
  CreateResponseModel,
  findPlayerById,
  updatePlayerRepositorie,
}) => async(userId, role, sport, playerId, paramPlayerId, playerProfile) => {
  if (role !== 'scout' || playerId !== paramPlayerId) {
    return CreateErrorResponseModel('Unauthorized user.', []);
  }
  if (!userId || !playerId || !sport) return CreateErrorResponseModel('Unauthorized user.', []);


  const validatedPlayerProfile = await validatePlayerDataEntitie(playerProfile);
  if (validatedPlayerProfile.length > 0) {
    return CreateErrorResponseModel('Wrong input data.', validatedPlayerProfile);
  }


  // const findedPlayer = await findPlayerById(playerId);
  // if (findedPlayer instanceof Error) {
  //   return CreateErrorResponseModel(findedUser.message, findedUser);
  // }


  const updatedPlayer = await updatePlayerRepositorie(userId, playerId, sport, playerProfile);
  if (updatedPlayer instanceof Error) {
    return CreateErrorResponseModel(updatedPlayer.message, updatedPlayer);
  }


  return CreateResponseModel('Updated player.', [updatedPlayer]);
};


module.exports = {
  updatePlayerProfileUseCase,
};
