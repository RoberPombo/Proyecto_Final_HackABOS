'use strict';

// Local imports: use_cases ========================================================================
const { updatePlayerProfileUseCase } = require('../../use_cases/players/update.player.profile.uc');


const updatePlayerProfileController = async(req, _res, next) => {
  try {
    const playerProfile = req.body;
    const paramPlayerId = req.params.id;
    const {
      userId, role, sport, playerId,
    } = req.claims;

    req.infoReq = { ...req.infoReq, userId };

    const response = await updatePlayerProfileUseCase(
      userId, role, sport, playerId, paramPlayerId, playerProfile,
    );

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  updatePlayerProfileController,
};
