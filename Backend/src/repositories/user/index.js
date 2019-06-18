'use strict';

// Local imports: this module ======================================================================
const { findUserRepositorie } = require('./find.user.repositorie');
const { saveUserRepositorie } = require('./save.user.repositorie');
const { updateUserRepositorie } = require('./update.user.repositorie');
// Local imports: datasources ======================================================================
const { findUserDatasource, saveUserDatasource, updateUserDatasource } = require('../../datasources/mongoDb/user/index');


module.exports = {
  findUserRepositorie: {
    byActivationCode: findUserRepositorie(findUserDatasource, 'activationCode'),
    byChangePassword: findUserRepositorie(findUserDatasource, 'changePassword'),
    byEmail: findUserRepositorie(findUserDatasource, 'email'),
    byId: findUserRepositorie(findUserDatasource, 'id'),
  },
  saveUserRepositorie: saveUserRepositorie(saveUserDatasource),
  updateUserRepositorie: {
    activate: updateUserRepositorie(updateUserDatasource, 'activate'),
    addActivationCode: updateUserRepositorie(updateUserDatasource, 'addActivationCode'),
    changePassword: updateUserRepositorie(updateUserDatasource, 'changePassword'),
    confirmChangePassword: updateUserRepositorie(updateUserDatasource, 'confirmChangePassword'),
    delete: updateUserRepositorie(updateUserDatasource, 'delete'),
    profile: updateUserRepositorie(updateUserDatasource, 'profile'),
  },
};
