'use strict';


const cleanDatasource = (UserModelData, option) => async(userId) => {
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
    await UserModelData.findByIdAndUpdate(filter, operation);
  } catch (e) {
    console.log(e);
  }
  return true;
};


module.exports = {
  cleanDatasource,
};
