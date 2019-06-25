'use strict';

// Local imports: use_cases ========================================================================
const { searchVideosYoutubeUseCase } = require('../../use_cases/players/search.videos.youtube.uc');


const searchVideosYoutubeController = async(req, res, next) => {
  try {
    const paramPlayerId = req.params.id;
    const filters = req.query;
    const { userId, role, playerId } = req.claims;

    req.infoReq = { ...req.infoReq, userId };

    const response = await searchVideosYoutubeUseCase(role, playerId, paramPlayerId, filters);

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  searchVideosYoutubeController,
};
