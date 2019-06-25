'use strict';

// Local imports: this module ======================================================================
const { CreatePlayerModelData } = require('./player.model.data');
const { cleanDatasource } = require('../user/clean.datasource');
const { saveUpdateProfileDatasource } = require('../../redis/auth/save.updated.profile.data');


const updatePlayerDatasource = option => async(userId, playerId, sport, dataUpdate) => {
  let filter = {
    _id: playerId,
    deletedAt: 0,
  };
  let operation;
  let dataUpdateRedis;

  if (option === 'delete') {
    const now = Date.now();
    operation = {
      deletedAt: now,
      modifiedAt: now,
    };
    await cleanDatasource.deletePlayer(userId, sport);
    dataUpdateRedis = { role: 'user', playerId: '' };
  } else if (option === 'profile') {
    // eslint-disable-next-line no-param-reassign
    dataUpdate.birthdate = new Date(dataUpdate.birthdate).getTime();
    operation = { ...dataUpdate, modifiedAt: Date.now() };
  } else if (option === 'addVideo') {
    filter = {
      ...filter, 'videos.videoId': { $ne: dataUpdate.videoId },
    };
    operation = {
      $push: {
        videos: {
          videoId: dataUpdate.videoId,
          views: dataUpdate.views,
          likes: dataUpdate.likes,
          publishedAt: dataUpdate.publishedAt,
        },
      },
    };
  }

  const PlayerModelData = await CreatePlayerModelData(sport);

  const updatedPlayer = await PlayerModelData.findOneAndUpdate(filter, operation);

  if (dataUpdateRedis && updatedPlayer) {
    saveUpdateProfileDatasource(userId, dataUpdateRedis);
  }

  return updatedPlayer;
};


module.exports = {
  updatePlayerDatasource: {
    addVideo: updatePlayerDatasource('addVideo'),
    delete: updatePlayerDatasource('delete'),
    profile: updatePlayerDatasource('profile'),
  },
};
