'use strict';

// Local imports: use_cases ========================================================================
const { getPlayersListUseCase } = require('../../use_cases/players/get.players.list.uc');


const getPlayersListController = async(req, res, next) => {
  const { userId, role, sport } = req.claims;

  req.infoReq = { ...req.infoReq, userId };

  try {
    const response = await getPlayersListUseCase(role, sport);

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  getPlayersListController,
};
