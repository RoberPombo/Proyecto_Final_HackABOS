'use strict';


const changeUserPasswordUseCase = ({
  createHashPasswordEntitie,
  createUuidV4Entitie,
  sendConfirmChangePasswordEntitie,
  validateUserDataEntitie,
  CreateErrorResponseModel,
  CreateResponseModel,
  changeUserPasswordRepositorie,
  findUserByEmail,
}) => async({ email, password }) => {
  const validatedData = await validateUserDataEntitie({ email, password });
  if (validatedData.length > 0) {
    return CreateErrorResponseModel('Wrong input data.', validatedData);
  }


  const findedUser = await findUserByEmail(email);
  if (findedUser instanceof Error) {
    return CreateErrorResponseModel(findedUser.message, findedUser);
  }


  const securePassword = createHashPasswordEntitie(password);
  const uuid = createUuidV4Entitie();


  const updatedUser = await changeUserPasswordRepositorie(
    findedUser[0]._id, { uuid, securePassword },
  );
  if (updatedUser instanceof Error) {
    return CreateErrorResponseModel(updatedUser.message, updatedUser);
  }


  sendConfirmChangePasswordEntitie(
    findedUser[0].email,
    uuid,
    findedUser[0].language,
  );


  return CreateResponseModel('Sent email to confirm password change.', []);
};


module.exports = {
  changeUserPasswordUseCase,
};
