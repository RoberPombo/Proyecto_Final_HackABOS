'use strict';

// Local imports: use_cases ========================================================================
const { addFavouritePlayerUseCase } = require('../../use_cases/user/add.favourite.player.uc');


const addFavouritePlayerController = async(req, res, next) => {
  const { _id: playerId, fullName, preferredPositions } = req.body;
  const { userId, sport, role } = req.claims;

  req.infoReq = { ...req.infoReq, userId };

  try {
    const response = await addFavouritePlayerUseCase(userId, sport, role, { playerId, fullName, preferredPositions });

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  addFavouritePlayerController,
};
