'use strict';

// Local imports: use_cases ========================================================================
const { addVideoUseCase } = require('../../use_cases/players/add.video.uc');


const addVideoController = async(req, _res, next) => {
  try {
    const videoData = req.body;
    const paramPlayerId = req.params.id;
    const {
      userId, role, sport, playerId,
    } = req.claims;

    req.infoReq = { ...req.infoReq, userId };

    const response = await addVideoUseCase(
      userId, role, sport, playerId, paramPlayerId, videoData,
    );

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  addVideoController,
};
