'use strict';


const sendEmailActivationUseCase = ({
  createUuidV4Entitie,
  sendEmailActivationEntitie,
  CreateErrorResponseModel,
  CreateResponseModel,
  addActivationCode,
  findUserByEmail,
}) => async(email) => {
  if (!email) return CreateErrorResponseModel('Invalid request data.', []);


  const findedUser = await findUserByEmail(email);
  if (findedUser instanceof Error) {
    return CreateErrorResponseModel(findedUser.message, findedUser);
  }
  if (findedUser[0].activatedAt > 0) {
    return CreateErrorResponseModel('Already active user.', []);
  }


  const newActivationCode = createUuidV4Entitie();
  const updatedUser = await addActivationCode(findedUser[0]._id, newActivationCode);
  if (updatedUser instanceof Error) {
    return CreateErrorResponseModel(updatedUser.message, updatedUser);
  }


  sendEmailActivationEntitie(
    findedUser[0].email,
    newActivationCode,
    findedUser[0].language,
  );


  return CreateResponseModel('Activation email sent.', []);
};


module.exports = {
  sendEmailActivationUseCase,
};
