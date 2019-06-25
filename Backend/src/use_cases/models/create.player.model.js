'use strict';


const CreatePlayerModel = (userId, sport, inputData) => ({
  userId,
  fullName: inputData.fullName,
  birthdate: new Date(inputData.birthdate).getTime(),
  nationality: inputData.nationality,
  height: inputData.height,
  weight: inputData.weight,
  sport,
  team: inputData.team,
  preferredFoot: inputData.preferredFoot,
  preferredPositions: inputData.preferredPositions,
  createdAt: Date.now(),
  modifiedAt: 0,
  deletedAt: 0,
});


module.exports = {
  CreatePlayerModel,
};
