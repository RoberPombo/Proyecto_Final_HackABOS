'use strict';

// Local imports: this module ======================================================================
const { createPlayerController } = require('./create.player.controller');
const { deletePlayerController } = require('./delete.player.controller');
const { getPlayerController } = require('./get.player.controller');
const { searchVideosYoutubeController } = require('./search.videos.youtube.controller');
const { updatePlayerProfileController } = require('./update.player.profile.controller');
// Local imports: use_cases ========================================================================
const {
  createPlayerUseCase,
  deletePlayerUseCase,
  getPlayersUseCase,
  searchVideosYoutubeUseCase,
  updatePlayerProfileUseCase,
} = require('../../use_cases/players/index');


module.exports = {
  createPlayerController: createPlayerController(createPlayerUseCase),
  deletePlayerController: deletePlayerController(deletePlayerUseCase),
  getPlayerController: getPlayerController(getPlayersUseCase),
  searchVideosYoutubeController: searchVideosYoutubeController(searchVideosYoutubeUseCase),
  updatePlayerProfileController: updatePlayerProfileController(updatePlayerProfileUseCase),
};
