'use strict';

// Local imports: use_cases ========================================================================
const { deleteUserUseCase } = require('../../use_cases/user/delete.user.uc');


const deleteUserController = async(req, _res, next) => {
  const {
    userId, role, playerId, sport,
  } = req.claims;

  req.infoReq = { ...req.infoReq, userId };

  try {
    const response = await deleteUserUseCase(userId, role, playerId, sport);

    req.response = response;

    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  deleteUserController,
};
