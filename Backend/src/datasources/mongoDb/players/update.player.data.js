'use strict';


const updatePlayerDatasource = (
  CreatePlayerModelData, option, saveUpdateProfileDatasource, cleanDB,
) => async(userId, playerId, sport, dataUpdate) => {
  const PlayerModelData = await CreatePlayerModelData(sport);

  const filter = {
    _id: playerId,
    deletedAt: 0,
  };
  let operation;

  if (option === 'delete') {
    const now = Date.now();
    operation = {
      deletedAt: now,
      modifiedAt: now,
    };
    await cleanDB(userId);
    saveUpdateProfileDatasource(userId, { role: 'user', playerId: '' });
  } else if (option === 'profile') {
    dataUpdate.birthdate = new Date(dataUpdate.birthdate).getTime();
    operation = { ...dataUpdate, modifiedAt: Date.now() };
  }


  const updatedPlayer = await PlayerModelData.findByIdAndUpdate(filter, operation);


  return updatedPlayer;
};


module.exports = {
  updatePlayerDatasource,
};
