'use strict';


const searchVideosYoutubeController = seachVideosYoutubeUseCase => async(req, res, next) => {
  const filters = req.body;
  const {
    userId, role, sport, playerId,
  } = req.claims;


  const response = await seachVideosYoutubeUseCase(userId, role, sport, playerId, filters);
  if (response instanceof Error) return next(response);

  return res.send(response);
  // req.response = response;
  // return next();
};


module.exports = {
  searchVideosYoutubeController,
};
