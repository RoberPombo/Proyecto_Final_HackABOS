'use strict';


const getPlayerController = getPlayerUseCase => async(req, res, next) => {
  const paramPlayerId = req.params.id;
  const {
    userId, role, sport, playerId,
  } = req.claims;


  const response = await getPlayerUseCase(userId, role, sport, playerId, paramPlayerId);
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  getPlayerController,
};
