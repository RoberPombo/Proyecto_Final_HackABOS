'use strict';


const searchVideosYoutubeUseCase = ({
  searchVideosYoutubeEntitie,
}) => async(userId, role, sport, playerId, filters) => {
  const searchedVideos = await searchVideosYoutubeEntitie(
    filters.filter, filters.page, filters.maxResults, filters.order
  );

  return searchedVideos;
};


module.exports = {
  searchVideosYoutubeUseCase,
};
