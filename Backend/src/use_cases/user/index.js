'use strict';

// Local imports: this module ======================================================================
const { activateUserUseCase } = require('./activate.user.uc');
const { changeUserPasswordUseCase } = require('./change.user.password.uc');
const { confirmChangeUserPasswordUseCase } = require('./confirm.change.user.password.uc');
const { createUserUseCase } = require('./create.user.uc');
const { deleteUserUseCase } = require('./delete.user.uc');
const { getProfileUseCase } = require('./get.profile.uc');
const { sendEmailActivationUseCase } = require('./send.email.activation.uc');
const { updateProfileUseCase } = require('./update.profile.uc');
const {
  createHashPasswordEntitie,
  createUuidV4Entitie,
  sendConfirmChangePasswordEntitie,
  sendEmailActivationEntitie,
  validateUserDataEntitie,
} = require('../entities/index');
const { CreateErrorResponseModel, CreateResponseModel, CreateUserModel } = require('../models/index');
// Local imports: repositories =====================================================================
const { updatePlayerRepositorie } = require('../../repositories/players/index');
const { findUserRepositorie, saveUserRepositorie, updateUserRepositorie } = require('../../repositories/user/index');


module.exports = {
  activateUserUseCase: activateUserUseCase({
    createUuidV4Entitie,
    sendEmailActivationEntitie,
    CreateErrorResponseModel,
    CreateResponseModel,
    activateUser: updateUserRepositorie.activate,
    addActivationCode: updateUserRepositorie.addActivationCode,
    findUserByActivationCode: findUserRepositorie.byActivationCode,
  }),
  changeUserPasswordUseCase: changeUserPasswordUseCase({
    createHashPasswordEntitie,
    createUuidV4Entitie,
    sendConfirmChangePasswordEntitie,
    validateUserDataEntitie,
    CreateErrorResponseModel,
    CreateResponseModel,
    changeUserPasswordRepositorie: updateUserRepositorie.changePassword,
    findUserByEmail: findUserRepositorie.byEmail,
  }),
  confirmChangeUserPasswordUseCase: confirmChangeUserPasswordUseCase({
    CreateErrorResponseModel,
    CreateResponseModel,
    confirmChangeUserPasswordRepositorie: updateUserRepositorie.confirmChangePassword,
    findUserByChangePassword: findUserRepositorie.byChangePassword,
  }),
  createUserUseCase: createUserUseCase({
    sendEmailActivationEntitie,
    validateUserDataEntitie,
    CreateErrorResponseModel,
    CreateResponseModel,
    CreateUserModel,
    saveUserRepositorie,
  }),
  deleteUserUseCase: deleteUserUseCase({
    CreateErrorResponseModel,
    CreateResponseModel,
    deleteUserRepositorie: updateUserRepositorie.delete,
    deletePlayerRepositorie: updatePlayerRepositorie.delete,
  }),
  getProfileUseCase: getProfileUseCase({
    CreateErrorResponseModel,
    CreateResponseModel,
    findUserById: findUserRepositorie.byId,
  }),
  sendEmailActivationUseCase: sendEmailActivationUseCase({
    createUuidV4Entitie,
    sendEmailActivationEntitie,
    CreateErrorResponseModel,
    CreateResponseModel,
    addActivationCode: updateUserRepositorie.addActivationCode,
    findUserByEmail: findUserRepositorie.byEmail,
  }),
  updateProfileUseCase: updateProfileUseCase({
    validateUserDataEntitie,
    CreateErrorResponseModel,
    CreateResponseModel,
    findUserById: findUserRepositorie.byId,
    updateProfileRepositorie: updateUserRepositorie.profile,
  }),
};
