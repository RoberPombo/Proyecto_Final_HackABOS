'use strict';


const updatePlayerRepositorie = (
  updatePlayerDatasource, option,
) => async(userId, playerId, sport, dataUpdate) => {
  let updatedPlayer;


  try {
    if (option === 'delete') {
      updatedPlayer = await updatePlayerDatasource.delete(userId, playerId, sport, '');
    } else if (option === 'profile') {
      updatedPlayer = await updatePlayerDatasource.profile(userId, playerId, sport, dataUpdate);
    }
  } catch (e) {
    return new Error('Internal server error.');
  }


  return updatedPlayer;
};


module.exports = {
  updatePlayerRepositorie,
};
