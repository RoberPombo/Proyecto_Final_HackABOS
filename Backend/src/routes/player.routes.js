'use strict';

// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const { addVideoController } = require('../controllers/players/add.video.controller');
const { checkJwtController } = require('../controllers/auth/check.jwt.controller');
const { createPlayerController } = require('../controllers/players/create.player.controller');
const { deletePlayerController } = require('../controllers/players/delete.player.controller');
const { getPlayerController } = require('../controllers/players/get.player.controller');
const { getPlayersListController } = require('../controllers/players/get.players.list.controller');
const { searchVideosYoutubeController } = require('../controllers/players/search.videos.youtube.controller');
const { updatePlayerProfileController } = require('../controllers/players/update.player.profile.controller');


const playerRoutes = express.Router();


playerRoutes.get('/', checkJwtController, getPlayersListController);

playerRoutes.post('/', checkJwtController, createPlayerController);

playerRoutes.get('/:id', checkJwtController, getPlayerController);

playerRoutes.put('/:id', checkJwtController, updatePlayerProfileController);

playerRoutes.delete('/:id', checkJwtController, deletePlayerController);

playerRoutes.get('/:id/youtube', checkJwtController, searchVideosYoutubeController);

playerRoutes.post('/:id/addVideo', checkJwtController, addVideoController);


module.exports = {
  playerRoutes,
};
