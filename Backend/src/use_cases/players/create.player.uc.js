'use strict';


const createPlayerUseCase = ({
  CreateErrorResponseModel,
  CreateResponseModel,
  CreatePlayerModel,
  findUserById,
  savePlayerRepositorie,
  validatePlayerDataEntitie,
}) => async(userId, role, inputData) => {
  if (role !== 'user') return CreateErrorResponseModel('Unauthorized user.', []);


  const validatedInputData = await validatePlayerDataEntitie(inputData);
  if (validatedInputData.length > 0) {
    return CreateErrorResponseModel('Wrong input data.', validatedInputData);
  }


  const findedUser = await findUserById(userId);
  if (findedUser instanceof Error) return CreateErrorResponseModel(findedUser.message, findedUser);
  if (findedUser[0].role !== 'user') return CreateErrorResponseModel('Unauthorized user.', []);


  const newPlayer = CreatePlayerModel(userId, inputData);
  if (newPlayer instanceof Error) return CreateErrorResponseModel(newPlayer.message, newPlayer);


  const savedPlayer = await savePlayerRepositorie(newPlayer);
  if (savedPlayer instanceof Error) {
    return CreateErrorResponseModel(savedPlayer.message, savedPlayer);
  }


  return CreateResponseModel('Created player.', [savedPlayer]);
};


module.exports = {
  createPlayerUseCase,
};
