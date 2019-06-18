'use strict';


const getProfileController = getProfileUseCase => async(req, res, next) => {
  const { userId } = req.claims;

  const response = await getProfileUseCase(userId);

  if (response instanceof Error) return next(response);

  req.response = response;

  return next();
};


module.exports = {
  getProfileController,
};
