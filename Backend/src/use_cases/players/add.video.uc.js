'use strict';


const addVideoUseCase = ({
  CreateErrorResponseModel,
  CreateResponseModel,
  updatePlayerRepositorie,
}) => async (userId, role, sport, playerId, paramPlayerId, videoData) {
  if (role !== 'scout' || playerId !== paramPlayerId) {
    return CreateErrorResponseModel('Unauthorized user.', []);
  }
  if (!userId || !playerId || !sport) return CreateErrorResponseModel('Unauthorized user.', []);


  const updatedPlayer = await updatePlayerRepositorie(userId, playerId, sport, videoData);
  if (updatedPlayer instanceof Error) {
    return CreateErrorResponseModel(updatedPlayer.message, updatedPlayer);
  }


  return CreateResponseModel('Video added.', [updatedPlayer]);
};


module.exports = {
  addVideoUseCase,
}
