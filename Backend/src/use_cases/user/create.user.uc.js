'use strict';


const createUserUseCase = ({
  sendEmailActivationEntitie,
  validateUserDataEntitie,
  CreateErrorResponseModel,
  CreateResponseModel,
  CreateUserModel,
  saveUserRepositorie,
}) => async(inputData) => {
  const validatedInputData = await validateUserDataEntitie(inputData);
  if (validatedInputData.length > 0) {
    return CreateErrorResponseModel('Wrong input data.', validatedInputData);
  }

  const newUser = CreateUserModel(inputData);
  if (newUser instanceof Error) return CreateErrorResponseModel(newUser.message, newUser);

  const savedUser = await saveUserRepositorie(newUser);
  if (savedUser instanceof Error) return CreateErrorResponseModel(savedUser.message, savedUser);

  await sendEmailActivationEntitie(
    savedUser.email,
    savedUser.activationCode[0].uuid,
    savedUser.language,
  );

  return CreateResponseModel('Created user.', [savedUser]);
};


module.exports = {
  createUserUseCase,
};
