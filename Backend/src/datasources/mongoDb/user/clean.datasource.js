'use strict';

// Local imports: this module ======================================================================
const { CreateUserModelData } = require('./user.model.data');
// Local imports: config ===========================================================================
const { Console } = require('../../../config/config.winston');


const cleanDatasource = option => async(userId, sport) => {
  const filter = {
    _id: userId,
  };
  let operation;

  if (option === 'activationCode') {
    operation = {
      $unset: { activationCode: '' },
    };
  } else if (option === 'changePassword') {
    operation = {
      $unset: { changePassword: '' },
    };
  } else if (option === 'deletePlayer') {
    operation = {
      $unset: { agentOf: '' },
      role: 'user',
    };
  }

  try {
    const UserModelData = CreateUserModelData(sport);

    await UserModelData.findByIdAndUpdate(filter, operation);
  } catch (error) {
    Console.error(error);
  }
  return true;
};


module.exports = {
  cleanDatasource: {
    activationCode: cleanDatasource('activationCode'),
    changePassword: cleanDatasource('changePassword'),
    deletePlayer: cleanDatasource('deletePlayer'),
  },
};
