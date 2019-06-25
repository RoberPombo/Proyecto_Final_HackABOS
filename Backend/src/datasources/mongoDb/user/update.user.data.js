'use strict';

// Local imports: this module ======================================================================
const { CreateUserModelData } = require('./user.model.data');
const { cleanDatasource } = require('./clean.datasource');
const { saveUpdateProfileDatasource } = require('../../redis/auth/save.updated.profile.data');


const updateUserDatasource = option => async(userId, sport, dataUpdate) => {
  let filter = {
    _id: userId,
    deletedAt: 0,
  };
  let operation;
  let dataUpdateRedis;

  if (option === 'activate') {
    operation = {
      activatedAt: Date.now(),
      modifiedAt: Date.now(),
    };
    await cleanDatasource.activationCode(userId, sport);
  } else if (option === 'confirmChangePassword') {
    operation = { ...dataUpdate, modifiedAt: Date.now() };
    await cleanDatasource.changePassword(userId, sport);
  } else if (option === 'addActivationCode') {
    operation = {
      $push: {
        activationCode: {
          uuid: dataUpdate,
          sport,
          sendAt: Date.now(),
        },
      },
    };
  } else if (option === 'profile') {
    operation = { ...dataUpdate, modifiedAt: Date.now() };
    dataUpdateRedis = dataUpdate;
  } else if (option === 'delete') {
    const now = Date.now();
    operation = {
      deletedAt: now,
      modifiedAt: now,
      'agentOf.deletedAt': now,
    };
    dataUpdateRedis = { deletedAt: now };
  } else if (option === 'changePassword') {
    operation = {
      modifiedAt: Date.now(),
      changePassword: {
        uuid: dataUpdate.uuid,
        password: dataUpdate.securePassword,
        sendAt: Date.now(),
      },
    };
  } else if (option === 'addPlayer') {
    filter = { ...filter, role: 'user' };
    operation = {
      role: 'agent',
      sport: dataUpdate.sport,
      modifiedAt: Date.now(),
      agentOf: {
        playerId: dataUpdate._id,
        sport: dataUpdate.sport,
        createdAt: dataUpdate.createdAt,
        deletedAt: 0,
      },
    };
    dataUpdateRedis = { playerId: dataUpdate._id, role: 'agent' };
  }

  const UserModelData = await CreateUserModelData(sport);

  const updatedUser = await UserModelData.findOneAndUpdate(filter, operation);

  if (dataUpdateRedis && updatedUser) {
    saveUpdateProfileDatasource(userId, dataUpdateRedis);
  }

  return updatedUser;
};


module.exports = {
  updateUserDatasource: {
    activate: updateUserDatasource('activate'),
    addActivationCode: updateUserDatasource('addActivationCode'),
    addPlayer: updateUserDatasource('addPlayer'),
    changePassword: updateUserDatasource('changePassword'),
    confirmChangePassword: updateUserDatasource('confirmChangePassword'),
    delete: updateUserDatasource('delete'),
    profile: updateUserDatasource('profile'),
  },
};
