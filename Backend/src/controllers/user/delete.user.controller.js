'use strict';


const deleteUserController = deleteUserUseCase => async(req, _res, next) => {
  const {
    userId, role, playerId, sport,
  } = req.claims;


  const response = await deleteUserUseCase(userId, role, playerId, sport);
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  deleteUserController,
};
