'use strict';

// Local imports. ==================================================================================
const { activateUserController } = require('./activate.user.controller');
const { changeUserPasswordController } = require('./change.user.password.controller');
const { confirmChangeUserPasswordController } = require('./confirm.change.user.password.controller');
const { createUserController } = require('./create.user.controller');
const { deleteUserController } = require('./delete.user.controller');
const { getProfileController } = require('./get.profile.controller');
const { sendEmailActivationController } = require('./send.email.activation.controller');
const { updateProfileController } = require('./update.profile.controller');
const {
  activateUserUseCase,
  changeUserPasswordUseCase,
  confirmChangeUserPasswordUseCase,
  createUserUseCase,
  deleteUserUseCase,
  getProfileUseCase,
  sendEmailActivationUseCase,
  updateProfileUseCase,
} = require('../../use_cases/user/index');


module.exports = {
  activateUserController: activateUserController(activateUserUseCase),
  changeUserPasswordController: changeUserPasswordController(changeUserPasswordUseCase),
  confirmChangeUserPasswordController: confirmChangeUserPasswordController(
    confirmChangeUserPasswordUseCase
  ),
  createUserController: createUserController(createUserUseCase),
  deleteUserController: deleteUserController(deleteUserUseCase),
  getProfileController: getProfileController(getProfileUseCase),
  sendEmailActivationController: sendEmailActivationController(sendEmailActivationUseCase),
  updateProfileController: updateProfileController(updateProfileUseCase),
};
