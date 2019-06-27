'use strict';

// Local imports: datasources ======================================================================
const { updateUserDatasource } = require('../../datasources/mongoDb/user/update.user.data');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../../use_cases/models/create.error.response.model');


const updateUserRepositorie = option => async(userId, sport, dataUpdate) => {
  let updatedUser;
  try {
    if (option === 'activate') {
      updatedUser = await updateUserDatasource.activate(userId, sport, dataUpdate);
    } else if (option === 'confirmChangePassword') {
      updatedUser = await updateUserDatasource.confirmChangePassword(userId, sport, dataUpdate);
    } else if (option === 'addActivationCode') {
      updatedUser = await updateUserDatasource.addActivationCode(userId, sport, dataUpdate);
    } else if (option === 'profile') {
      updatedUser = await updateUserDatasource.profile(userId, sport, dataUpdate);
    } else if (option === 'delete') {
      updatedUser = await updateUserDatasource.delete(userId, sport, '');
    } else if (option === 'changePassword') {
      updatedUser = await updateUserDatasource.changePassword(userId, sport, dataUpdate);
    } else if (option === 'addPlayer') {
      updatedUser = await updateUserDatasource.addPlayer(userId, sport, dataUpdate);
    } else if (option === 'addFavoritePlayer') {
      updatedUser = await updateUserDatasource.addFavoritePlayer(userId, sport, dataUpdate);
    }
  } catch (error) {
    throw CreateErrorResponseModel('Internal server error.', 'update.user.repositorie.js', error);
  }


  return updatedUser;
};


module.exports = {
  updateUserRepositorie: {
    activate: updateUserRepositorie('activate'),
    addActivationCode: updateUserRepositorie('addActivationCode'),
    addFavoritePlayer: updateUserRepositorie('addFavoritePlayer'),
    addPlayer: updateUserRepositorie('addPlayer'),
    changePassword: updateUserRepositorie('changePassword'),
    confirmChangePassword: updateUserRepositorie('confirmChangePassword'),
    delete: updateUserRepositorie('delete'),
    profile: updateUserRepositorie('profile'),
  },
};
