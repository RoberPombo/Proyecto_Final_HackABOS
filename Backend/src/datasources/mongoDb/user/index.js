'use strict';

// Local imports: this module ======================================================================
const { cleanDatasource } = require('./clean.datasource');
const { findUserDatasource } = require('./find.user.data');
const { saveUserDatasource } = require('./save.user.data');
const { updateUserDatasource } = require('./update.user.data');
const { UserModelData } = require('./user.model.data');
const { saveUpdateProfileDatasource } = require('../../redis/auth/index');


module.exports = {
  cleanDatasource,
  findUserDatasource: {
    byActivationCode: findUserDatasource(UserModelData, 'activationCode'),
    byChangePassword: findUserDatasource(UserModelData, 'changePassword'),
    byEmail: findUserDatasource(UserModelData, 'email'),
    byId: findUserDatasource(UserModelData, 'id'),
  },
  saveUserDatasource: saveUserDatasource(UserModelData),
  updateUserDatasource: {
    activate: updateUserDatasource(UserModelData, 'activate', saveUpdateProfileDatasource, cleanDatasource(UserModelData, 'activationCode')),
    addActivationCode: updateUserDatasource(UserModelData, 'addActivationCode', saveUpdateProfileDatasource),
    addPlayer: updateUserDatasource(UserModelData, 'addPlayer', saveUpdateProfileDatasource),
    changePassword: updateUserDatasource(UserModelData, 'changePassword', saveUpdateProfileDatasource),
    confirmChangePassword: updateUserDatasource(UserModelData, 'confirmChangePassword', saveUpdateProfileDatasource, cleanDatasource(UserModelData, 'changePassword')),
    delete: updateUserDatasource(UserModelData, 'delete', saveUpdateProfileDatasource),
    profile: updateUserDatasource(UserModelData, 'profile', saveUpdateProfileDatasource),
  },
  UserModelData,
};
