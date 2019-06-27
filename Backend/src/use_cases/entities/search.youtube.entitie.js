'use strict';

// Imports modules npm. ============================================================================
const axios = require('axios');
// Local imports: this module ======================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
// Declared environment variables ==================================================================
const {
  YOUTUBE_API_KEY_YOUTUBE: apiKeyYoutube,
  YOUTUBE_URL_SEARCH: urlYoutubeSearch,
  YOUTUBE_URL_VIDEO: urlYoutubeVideo,
} = process.env;


const searchVideosYoutubeEntitie = async(searchValues) => {
  try {
    const searchValue = (searchValues && searchValues.filter) ? `&q=${searchValues.filter}` : '';
    const page = (searchValues && searchValues.page) ? `&pageToken=${searchValues.page}` : '';
    const maxResults = (searchValues && searchValues.maxResults) ? `&maxResults=${searchValues.maxResults}` : '&maxResults=5';
    const order = (searchValues && searchValues.order) ? `&order=${searchValues.order}` : '&order=relevance';

    const searchUrl = `${urlYoutubeSearch}${searchValue}${maxResults}${order}${page}&key=${apiKeyYoutube}`;
    // @ts-ignore
    const responseSearch = await axios.get(searchUrl);
    const { nextPageToken } = responseSearch.data;
    const { prevPageToken } = responseSearch.data;
    const { totalResults } = responseSearch.data.pageInfo;
    const ids = responseSearch.data.items
      .map(item => item.id.videoId)
      .filter(item => item !== undefined).join(',');

    const videosUrl = `${urlYoutubeVideo}&id=${ids}&key=${apiKeyYoutube}`;
    // @ts-ignore
    const responseVideos = await axios.get(videosUrl);

    const items = responseVideos.data.items
      .map(item => ({
        id: item.id,
        publishedAt: item.snippet.publishedAt,
        title: item.snippet.title,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        dislikeCount: item.statistics.dislikeCount,
        embedHtml: item.player.embedHtml,
      }));

    return {
      nextPageToken, prevPageToken, totalResults, items,
    };
  } catch (error) {
    throw CreateErrorResponseModel('Error in connection with Youtube.', 'search.youtube.entitie.js', error);
  }
};


module.exports = {
  searchVideosYoutubeEntitie,
};
