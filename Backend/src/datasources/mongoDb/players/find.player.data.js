'use strict';


const findPlayerDatasource = (CreatePlayerModelData, option) => async(filterValue, sport) => {
  const PlayerDataModel = await CreatePlayerModelData(sport);


  let projection;
  let filter;


  if (option === 'id') {
    projection = {
      __v: 0,
      createdAt: 0,
      modifiedAt: 0,
      deletedAt: 0,
      userId: 0,
    };
    filter = {
      _id: filterValue,
      deletedAt: 0,
    };
  }


  const findedPlayers = await PlayerDataModel.find(filter, projection).lean();
  return findedPlayers;
};


module.exports = {
  findPlayerDatasource,
};
