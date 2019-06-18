'use strict';


const getPlayersUseCase = ({
  CreateErrorResponseModel,
  CreateResponseModel,
  findPlayerById,
}) => async(userId, role, sport, playerId, paramPlayerId) => {
  if (role !== 'team' && playerId !== paramPlayerId) {
    return CreateErrorResponseModel('Unauthorized user.', []);
  }
  if (!userId || !playerId || !sport) return CreateErrorResponseModel('Unauthorized user.', []);


  const findedPlayer = await findPlayerById(playerId, sport);
  if (findedPlayer instanceof Error) {
    return CreateErrorResponseModel(findedPlayer.message, findedPlayer);
  }


  return CreateResponseModel('Sent player profile.', findedPlayer);
};


module.exports = {
  getPlayersUseCase,
};
