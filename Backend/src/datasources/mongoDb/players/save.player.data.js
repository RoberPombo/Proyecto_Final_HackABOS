'use strict';

// Local imports: this module ======================================================================
const { CreatePlayerModelData } = require('./player.model.data');
const { getUpdateProfileDatasource } = require('../../redis/auth/get.update.profile.data');


const savePlayerDatasource = async(playerData) => {
  const updatedUserProfile = await getUpdateProfileDatasource(playerData.userId);
  if (updatedUserProfile && updatedUserProfile.role && updatedUserProfile.role !== 'user') {
    throw new Error('Forbidden access.');
  }

  const PlayerModelData = await CreatePlayerModelData(playerData.sport);

  const savedPlayer = await PlayerModelData.create(playerData);

  return savedPlayer;
};


module.exports = {
  savePlayerDatasource,
};
