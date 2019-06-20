'use strict';

// Local imports: this module ======================================================================
const { findPlayerRepositorie } = require('./find.player.repositorie');
const { savePlayerRepositorie } = require('./save.player.repositorie');
const { updatePlayerRepositorie } = require('./update.player.repositorie');
// Local imports: datasources ======================================================================
const {
  findPlayerDatasource, savePlayerDatasource, updatePlayerDatasource,
} = require('../../datasources/mongoDb/players/index');


module.exports = {
  findPlayerRepositorie: {
    byId: findPlayerRepositorie(findPlayerDatasource, 'id'),
  },
  savePlayerRepositorie: savePlayerRepositorie(savePlayerDatasource),
  updatePlayerRepositorie: {
    addVideo: updatePlayerRepositorie(updatePlayerDatasource, 'addVideo'),
    delete: updatePlayerRepositorie(updatePlayerDatasource, 'delete'),
    profile: updatePlayerRepositorie(updatePlayerDatasource, 'profile'),
  },
};
