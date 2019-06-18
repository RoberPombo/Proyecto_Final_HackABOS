'use strict';


const findPlayerRepositorie = (findPlayerDatasource, option) => async(filterValue, sport) => {
  let findedPlayer;


  try {
    if (option === 'id') {
      findedPlayer = await findPlayerDatasource.byId(filterValue, sport);
    }
  } catch (e) {
    if (e.message.includes('Object failed')) {
      return new Error('Invalid requres data.');
    }
    return new Error('Internal server error.');
  }

  if (findedPlayer.length === 0) {
    return new Error('Invalid request data.');
  }


  return findedPlayer;
};


module.exports = {
  findPlayerRepositorie,
};
