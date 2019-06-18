'use strict';


const savePlayerDatasource = (
  CreatePlayerModelData,
  updateUserAddPlayer,
) => async(playerData) => {
  const PlayerModelData = await CreatePlayerModelData(playerData.sport);


  const savedPlayer = await PlayerModelData.create(playerData);


  await updateUserAddPlayer(
    savedPlayer.userId,
    {
      playerId: savedPlayer._id,
      sport: savedPlayer.sport,
      createdAt: savedPlayer.createdAt,
    }
  );

  return savedPlayer;
};


module.exports = {
  savePlayerDatasource,
};
