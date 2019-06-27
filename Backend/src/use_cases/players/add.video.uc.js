'use strict';

// Local imports: use_cases/entities ===============================================================
const { validatePlayerDataEntitie } = require('../entities/validate.player.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { updatePlayerRepositorie } = require('../../repositories/players/update.player.repositorie');


const addVideoUseCase = async(userId, role, sport, playerId, paramPlayerId, videoData) => {
  if (role !== 'agent' || playerId !== paramPlayerId) {
    return CreateErrorResponseModel('Forbidden user.', 'add.video.uc.js', {});
  }
  if (!userId || !playerId || !sport) {
    return CreateErrorResponseModel('Unauthorized user.', 'add.video.uc.js', {});
  }

  const requiredFileds = ['_id', 'videos'];
  const validVideoData = await validatePlayerDataEntitie({
    _id: paramPlayerId,
    videos: [{
      videoId: videoData.videoId,
      views: videoData.viewCount,
      likes: videoData.likeCount,
      title: videoData.channelTitle,
      publishedAt: new Date(videoData.publishedAt).getTime(),
    }],
  }, requiredFileds);

  const updatedPlayer = await updatePlayerRepositorie.addVideo(
    userId, playerId, sport, validVideoData.videos[0]
  );
  if (!updatedPlayer) throw CreateErrorResponseModel('Video has already been added.', 'add.video.uc.js', {});

  return CreateResponseModel('Video added to player.', 'add.video.uc.js', updatedPlayer);
};


module.exports = {
  addVideoUseCase,
};
