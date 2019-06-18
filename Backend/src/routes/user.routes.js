'use strict';

// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const { checkJwtController } = require('../controllers/auth');
const {
  activateUserController,
  changeUserPasswordController,
  confirmChangeUserPasswordController,
  deleteUserController,
  getProfileController,
  createUserController,
  sendEmailActivationController,
  updateProfileController,
} = require('../controllers/user');


const userRoutes = express.Router();


userRoutes.get('/', checkJwtController, getProfileController);

userRoutes.post('/', createUserController);

userRoutes.put('/', checkJwtController, updateProfileController);

userRoutes.delete('/', checkJwtController, deleteUserController);

userRoutes.get('/activation', activateUserController);

userRoutes.post('/activation', sendEmailActivationController);

userRoutes.get('/password', confirmChangeUserPasswordController);

userRoutes.post('/password', changeUserPasswordController);


module.exports = {
  userRoutes,
};
