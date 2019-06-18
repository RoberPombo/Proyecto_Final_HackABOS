'use strict';


const deletePlayerController = deletePlayerUseCase => async(req, _res, next) => {
  const paramPlayerId = req.params.id;
  const {
    userId, role, sport, playerId,
  } = req.claims;


  const response = await deletePlayerUseCase(
    userId, role, sport, playerId, paramPlayerId,
  );
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  deletePlayerController,
};
