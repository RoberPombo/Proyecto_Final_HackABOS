'use strict';

// Local imports: use_cases ========================================================================
const { createPlayerUseCase } = require('../../use_cases/players/create.player.uc');


const createPlayerController = async(req, res, next) => {
  try {
    const inputData = req.body;
    const { userId, role, sport } = req.claims;

    req.infoReq = { ...req.infoReq, userId };

    const response = await createPlayerUseCase(userId, role, sport, inputData);

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  createPlayerController,
};
