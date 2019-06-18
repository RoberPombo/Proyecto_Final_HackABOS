'use strict';


const updateUserDatasource = (
  UserDataModel, option, saveUpdateProfileDatasource, cleanDB,
) => async(userId, dataUpdate) => {
  const filter = {
    _id: userId,
    deletedAt: 0,
  };
  let operation;

  if (option === 'activate') {
    operation = {
      activatedAt: Date.now(),
      modifiedAt: Date.now(),
    };
    await cleanDB(userId);
  } else if (option === 'confirmChangePassword') {
    operation = { ...dataUpdate, modifiedAt: Date.now() };
    await cleanDB(userId);
  } else if (option === 'addActivationCode') {
    operation = {
      $push: {
        activationCode: {
          uuid: dataUpdate,
          sendAt: Date.now(),
        },
      },
    };
  } else if (option === 'profile') {
    operation = { ...dataUpdate, modifiedAt: Date.now() };
    saveUpdateProfileDatasource(userId, dataUpdate);
  } else if (option === 'delete') {
    const now = Date.now();
    operation = {
      deletedAt: now,
      modifiedAt: now,
      'agentOf.deletedAt': now,
    };
    saveUpdateProfileDatasource(userId, { deletedAt: now });
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
    operation = {
      role: 'scout',
      sport: dataUpdate.sport,
      modifiedAt: Date.now(),
      agentOf: {
        playerId: dataUpdate.playerId,
        sport: dataUpdate.sport,
        createdAt: dataUpdate.createdAt,
        deletedAt: 0,
      },
    };
    saveUpdateProfileDatasource(userId, { ...dataUpdate, role: 'scout' });
  }

  const updatedUser = await UserDataModel.findByIdAndUpdate(filter, operation);


  return updatedUser;
};


module.exports = {
  updateUserDatasource,
};
