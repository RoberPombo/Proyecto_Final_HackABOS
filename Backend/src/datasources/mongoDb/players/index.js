'use strict';

// Local imports: this module ======================================================================
const { CreatePlayerModelData } = require('./player.model.data');
const { findPlayerDatasource } = require('./find.player.data');
const { savePlayerDatasource } = require('./save.player.data');
const { updatePlayerDatasource } = require('./update.player.data');
const { cleanDatasource, updateUserDatasource, UserModelData } = require('../user/index');
const { saveUpdateProfileDatasource } = require('../../redis/auth/index');


module.exports = {
  findPlayerDatasource: {
    byId: findPlayerDatasource(CreatePlayerModelData, 'id'),
  },
  savePlayerDatasource: savePlayerDatasource(
    CreatePlayerModelData,
    updateUserDatasource.addPlayer,
  ),
  updatePlayerDatasource: {
    addVideo: updatePlayerDatasource(CreatePlayerModelData, 'addVideo'),
    delete: updatePlayerDatasource(
      CreatePlayerModelData, 'delete',
      saveUpdateProfileDatasource,
      cleanDatasource(UserModelData, 'deletePlayer')
    ),
    profile: updatePlayerDatasource(CreatePlayerModelData, 'profile'),
  },
};
