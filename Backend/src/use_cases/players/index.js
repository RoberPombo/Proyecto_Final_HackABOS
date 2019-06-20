'use strict';


// Local imports: this module ======================================================================
const { addVideoUseCase } = require('./add.video.uc');
const { createPlayerUseCase } = require('./create.player.uc');
const { deletePlayerUseCase } = require('./delete.player.uc');
const { getPlayersUseCase } = require('./get.players.uc');
const { searchVideosYoutubeUseCase } = require('./search.videos.youtube.uc');
const { updatePlayerProfileUseCase } = require('./update.player.profile.uc');
const { searchVideosYoutubeEntitie, validatePlayerDataEntitie } = require('../entities/index');
const { CreateErrorResponseModel, CreateResponseModel, CreatePlayerModel } = require('../models/index');
// Local imports: repositories =====================================================================
const { findPlayerRepositorie, savePlayerRepositorie, updatePlayerRepositorie } = require('../../repositories/players/index');
const { findUserRepositorie } = require('../../repositories/user/index');


module.exports = {
  addVideoUseCase: addVideoUseCase({
    CreateErrorResponseModel,
    CreateResponseModel,
    updatePlayerRepositorie,
  }),
  createPlayerUseCase: createPlayerUseCase({
    CreateErrorResponseModel,
    CreateResponseModel,
    CreatePlayerModel,
    findUserById: findUserRepositorie.byId,
    savePlayerRepositorie,
    validatePlayerDataEntitie,
  }),
  deletePlayerUseCase: deletePlayerUseCase({
    CreateErrorResponseModel,
    CreateResponseModel,
    deletePlayerRepositorie: updatePlayerRepositorie.delete,
  }),
  getPlayersUseCase: getPlayersUseCase({
    CreateErrorResponseModel,
    CreateResponseModel,
    findPlayerById: findPlayerRepositorie.byId,
  }),
  searchVideosYoutubeUseCase: searchVideosYoutubeUseCase({
    searchVideosYoutubeEntitie,
  }),
  updatePlayerProfileUseCase: updatePlayerProfileUseCase({
    validatePlayerDataEntitie,
    CreateErrorResponseModel,
    CreateResponseModel,
    findPlayerById: findPlayerRepositorie.byId,
    updatePlayerRepositorie: updatePlayerRepositorie.profile,
  }),
};
