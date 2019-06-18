'use strict';


const deleteUserUseCase = ({
  CreateErrorResponseModel,
  CreateResponseModel,
  deleteUserRepositorie,
  deletePlayerRepositorie,
}) => async(userId, role, playerId, sport) => {
  if (!userId) return CreateErrorResponseModel('Unauthorized user.', []);

  const updatedUser = await deleteUserRepositorie(userId);
  if (updatedUser instanceof Error) {
    return CreateErrorResponseModel(updatedUser.message, updatedUser);
  }
  if (updatedUser.deletedAt > 0) {
    return CreateErrorResponseModel('Invalid request data.', []);
  }


  if (role === 'scout') {
    await deletePlayerRepositorie(userId, playerId, sport);
  }


  return CreateResponseModel('Deleted user.', []);
};


module.exports = {
  deleteUserUseCase,
};
