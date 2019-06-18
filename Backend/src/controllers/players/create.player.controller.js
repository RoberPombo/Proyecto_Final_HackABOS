'use strict';


const createPlayerController = createPlayerUseCase => async(req, res, next) => {
  const playerData = req.body;
  const { userId, role } = req.claims;


  const response = await createPlayerUseCase(userId, role, playerData);
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  createPlayerController,
};
