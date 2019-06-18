'use strict';


const updateProfileController = updateProfileUseCase => async(req, _res, next) => {
  const userProfile = req.body;
  const { userId } = req.claims;


  const response = await updateProfileUseCase(userId, userProfile);
  if (response instanceof Error) return next(response);


  req.response = response;
  return next();
};


module.exports = {
  updateProfileController,
};
