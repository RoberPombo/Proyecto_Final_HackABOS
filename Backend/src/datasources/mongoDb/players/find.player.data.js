'use strict';

// Local imports: this module ======================================================================
const { CreatePlayerModelData } = require('./player.model.data');


const findPlayerDatasource = option => async(filterValue, sport) => {
  const PlayerDataModel = await CreatePlayerModelData(sport);

  const projection = {
    __v: 0,
  };
  let filter;

  if (option === 'id') {
    filter = {
      _id: filterValue,
      deletedAt: 0,
    };
  }

  const findedPlayers = await PlayerDataModel.find(filter, projection).lean();

  return findedPlayers;
};


module.exports = {
  findPlayerDatasource: {
    byId: findPlayerDatasource('id'),
  },
};
