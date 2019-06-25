'use strict';

// Local imports: use_cases ========================================================================
const { getPlayersUseCase } = require('../../use_cases/players/get.players.uc');


const getPlayerController = async(req, res, next) => {
  const paramPlayerId = req.params.id;
  const {
    userId, role, sport, playerId,
  } = req.claims;

  req.infoReq = { ...req.infoReq, userId };

  try {
    const response = await getPlayersUseCase(role, sport, playerId, paramPlayerId);

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  getPlayerController,
};
