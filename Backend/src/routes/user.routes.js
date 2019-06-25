'use strict';

// Imports modules npm. ============================================================================
const express = require('express');
// Local imports: this module ======================================================================
const { activateUserController } = require('../controllers/user/activate.user.controller');
const { changeUserPasswordController } = require('../controllers/user/change.user.password.controller');
const { checkJwtController } = require('../controllers/auth/check.jwt.controller');
const { confirmChangeUserPasswordController } = require('../controllers/user/confirm.change.user.password.controller');
const { createUserController } = require('../controllers/user/create.user.controller');
const { deleteUserController } = require('../controllers/user/delete.user.controller');
const { getUserProfileController } = require('../controllers/user/get.user.controller');
const { sendEmailActivationController } = require('../controllers/user/send.email.activation.controller');
const { updateUserProfileController } = require('../controllers/user/update.user.controller');


// const {} = require('../controllers/user');


const userRoutes = express.Router();


userRoutes.get('/', checkJwtController, getUserProfileController);

userRoutes.post('/', createUserController);

userRoutes.put('/', checkJwtController, updateUserProfileController);

userRoutes.delete('/', checkJwtController, deleteUserController);

userRoutes.get('/activation', activateUserController);

userRoutes.post('/activation', sendEmailActivationController);

userRoutes.get('/password', confirmChangeUserPasswordController);

userRoutes.post('/password', changeUserPasswordController);


module.exports = {
  userRoutes,
};
