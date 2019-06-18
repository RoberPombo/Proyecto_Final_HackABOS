'use strict';

const axios = require('axios');


const {
  API_KEY_YOUTUBE: apiKeyYoutube,
  API_URL_YOUTUBE: apiYoutubeUrl,
} = process.env;


const searchVideosYoutubeEntitie = async(searchValue, page = '', maxResults = '20', order = 'relevance') => {
  try {
    const searchUrl = `${apiYoutubeUrl}/search?part=snippet&q=${searchValue}&pageToken=${page}&maxResults=${maxResults}&order=${order}&safeSearch=strict&key=${apiKeyYoutube}`;
    const responseSearch = await axios.get(searchUrl);
    const { nextPageToken } = responseSearch.data;
    const { prevPageToken } = responseSearch.data;
    const { totalResults } = responseSearch.data.pageInfo;
    const ids = responseSearch.data.items
      .map(item => item.id.videoId)
      .filter(item => item !== undefined).join(',');

    const videosUrl = `${apiYoutubeUrl}/videos?part=snippet,statistics,player&id=${ids}&key=${apiKeyYoutube}`;
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
  } catch (e) {
    return new Error('Internal server error.');
  }
};


module.exports = {
  searchVideosYoutubeEntitie,
};
