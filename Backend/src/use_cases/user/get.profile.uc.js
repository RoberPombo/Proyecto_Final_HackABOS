'use strict';


const getProfileUseCase = ({
  CreateErrorResponseModel,
  CreateResponseModel,
  findUserById,
}) => async(userId) => {
  if (!userId) return CreateErrorResponseModel('Invalid request data.', []);


  const findedUser = await findUserById(userId);
  if (findedUser instanceof Error) {
    return CreateErrorResponseModel(findedUser.message, findedUser);
  }


  return CreateResponseModel('Sent user profile.', findedUser);
};


module.exports = {
  getProfileUseCase,
};
