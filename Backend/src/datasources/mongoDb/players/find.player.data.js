'use strict';

// Local imports: this module ======================================================================
const { CreatePlayerModelData } = require('./player.model.data');


const findPlayerDatasource = option => async(filterValue, sport) => {
  const PlayerDataModel = await CreatePlayerModelData(sport);

  const projection = {
    __v: 0,
    createdAt: 0,
    modifiedAt: 0,
    deletedAt: 0,
  };
  let filter;

  if (option === 'id') {
    const newFilter = (filterValue && filterValue._id) ? filterValue._id : filterValue;
    filter = {
      _id: newFilter,
      deletedAt: 0,
    };
  } else if (option === 'list') {
    filter = {};
  }

  const findedPlayers = await PlayerDataModel.find(filter, projection).lean();

  return findedPlayers;
};


module.exports = {
  findPlayerDatasource: {
    byId: findPlayerDatasource('id'),
    list: findPlayerDatasource('list'),
  },
};
