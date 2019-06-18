'use strict';


const savePlayerRepositorie = savePlayerDatasource => async(playerData) => {
  try {
    return await savePlayerDatasource(playerData);
  } catch (e) {
    if (e.message.includes('dup key')) {
      return new Error('Player already exists in database.');
    }
    return new Error('Internal server error.');
  }
};


module.exports = {
  savePlayerRepositorie,
};
