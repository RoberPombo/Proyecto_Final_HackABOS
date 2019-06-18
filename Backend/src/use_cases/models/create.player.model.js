'use strict';


const CreatePlayerModel = (userId, inputData) => ({
  userId,
  fullName: inputData.fullName,
  birthdate: new Date(inputData.birthdate).getTime(),
  nationality: inputData.nationality,
  height: inputData.height,
  weight: inputData.weight,
  sport: inputData.sport,
  team: inputData.team,
  preferredFoot: inputData.preferredFoot,
  preferredPositions: inputData.preferredPositions,
  videos: [],
  createdAt: Date.now(),
  modifiedAt: 0,
  deletedAt: 0,
});


module.exports = {
  CreatePlayerModel,
};
