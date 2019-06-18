'use strict';

// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const { checkJwtController } = require('../controllers/auth/index');
const {
  createPlayerController,
  deletePlayerController,
  getPlayerController,
  searchVideosYoutubeController,
  updatePlayerProfileController,
} = require('../controllers/players/index');


const playerRoutes = express.Router();


playerRoutes.post('/', checkJwtController, createPlayerController);

playerRoutes.get('/:id', checkJwtController, getPlayerController);

playerRoutes.put('/:id', checkJwtController, updatePlayerProfileController);

playerRoutes.delete('/:id', checkJwtController, deletePlayerController);

playerRoutes.post('/youtube', checkJwtController, searchVideosYoutubeController);

module.exports = {
  playerRoutes,
};
