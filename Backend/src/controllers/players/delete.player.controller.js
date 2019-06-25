'use strict';

// Local imports: use_cases ========================================================================
const { deletePlayerUseCase } = require('../../use_cases/players/delete.player.uc');


const deletePlayerController = async(req, _res, next) => {
  try {
    const paramPlayerId = req.params.id;
    const {
      userId, role, sport, playerId,
    } = req.claims;

    req.infoReq = { ...req.infoReq, userId };

    const response = await deletePlayerUseCase(
      userId, role, sport, playerId, paramPlayerId,
    );
    if (response instanceof Error) return next(response);


    req.response = response;
    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  deletePlayerController,
};
