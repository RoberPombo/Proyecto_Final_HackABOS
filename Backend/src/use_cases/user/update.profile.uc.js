'use strict';


const updateProfileUseCase = ({
  validateUserDataEntitie,
  CreateErrorResponseModel,
  CreateResponseModel,
  findUserById,
  updateProfileRepositorie,
}) => async(userId, userProfile) => {
  const validatedUserProfile = await validateUserDataEntitie(userProfile);
  if (validatedUserProfile.length > 0) {
    return CreateErrorResponseModel('Wrong input data.', validatedUserProfile);
  }


  // const findedUser = await findUserById(userId);
  // if (findedUser instanceof Error) {
  //   return CreateErrorResponseModel(findedUser.message, findedUser);
  // }


  const updatedProfile = await updateProfileRepositorie(userId, userProfile);
  if (updatedProfile instanceof Error) {
    return CreateErrorResponseModel(updatedProfile.message, updatedProfile);
  }


  return CreateResponseModel('Updated profile.', [updatedProfile]);
};


module.exports = {
  updateProfileUseCase,
};
