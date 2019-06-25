'use strict';

// Local imports: use_cases/entities ===============================================================
const { searchVideosYoutubeEntitie } = require('../entities/search.youtube.entitie');
const { validatePlayerDataEntitie } = require('../entities/validate.player.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');


const searchVideosYoutubeUseCase = async(role, playerId, paramPlayerId, filters) => {
  if (role !== 'agent' || playerId !== paramPlayerId) {
    throw CreateErrorResponseModel('Forbidden user.', 'search.videos.youtube.uc.js', {});
  }

  const requiredFields = ['id', 'filter', 'page', 'maxResults', 'order'];
  const validFilters = await validatePlayerDataEntitie({ ...filters, _id: paramPlayerId }, requiredFields);

  const searchedVideos = await searchVideosYoutubeEntitie(validFilters);

  return CreateResponseModel('Sent the searched videos.', 'seach.videos.youtube.uc.js', searchedVideos);
};


module.exports = {
  searchVideosYoutubeUseCase,
};
