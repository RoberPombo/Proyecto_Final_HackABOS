'use strict';


const addVideoController = addVideoUseCase => async(req, _res, next) => {
  const playerProfile = req.body;
  const paramPlayerId = req.params.id;
  const {
    userId, role, sport, playerId,
  } = req.claims;


  const response = await addVideoUseCase(
    userId, role, sport, playerId, paramPlayerId, playerProfile,
  );
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  addVideoController,
};
