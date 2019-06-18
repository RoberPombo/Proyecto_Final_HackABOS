'use strict';


/**
 *
 * @param {Object} object
 * @param {IcreateUuidV4Entitie} object.createUuidV4Entitie
 * @param {IsendEmailActivationEntitie} object.sendEmailActivationEntitie
 * @param {ICreateErrorResponseModel} object.CreateErrorResponseModel
 * @param {ICreateResponseModel} object.CreateResponseModel
 * @param {IactivateUser} object.activateUser
 * @param {IaddActivationCode} object.addActivationCode
 * @param {IfindUserByActivationCode} object.findUserByActivationCode
 *
 * @returns {IactivateUserUseCase}
 *
 */
const activateUserUseCase = ({
  createUuidV4Entitie,
  sendEmailActivationEntitie,
  CreateErrorResponseModel,
  CreateResponseModel,
  activateUser,
  addActivationCode,
  findUserByActivationCode,
}) => async(activationCode) => {
  if (!activationCode) return CreateErrorResponseModel('Invalid request data.', []);

  const findedUser = await findUserByActivationCode(activationCode);
  if (findedUser instanceof Error) return CreateErrorResponseModel(findedUser.message, findedUser);
  if (findedUser[0].activatedAt > 0) return CreateErrorResponseModel('Already active user.', []);

  const dateActivationCode = findedUser[0].activationCode.filter((code) => {
    if (code.uuid === activationCode) return true;
    return false;
  });

  const difDays = (Date.now() - dateActivationCode[0].sendAt) / (1000 * 60 * 60 * 24);
  if (difDays >= 1) {
    const newActivationCode = createUuidV4Entitie();
    const updatedUser = await addActivationCode(findedUser[0]._id, newActivationCode);
    if (updatedUser instanceof Error) {
      return CreateErrorResponseModel(updatedUser.message, updatedUser);
    }

    await sendEmailActivationEntitie(
      findedUser[0].email,
      newActivationCode,
      findedUser[0].language,
    );

    return CreateErrorResponseModel('Expired activation code.', []);
  }

  const activatedUser = await activateUser(findedUser[0]._id);
  if (activatedUser instanceof Error) {
    return CreateErrorResponseModel(activatedUser.message, activatedUser);
  }

  return CreateResponseModel('Activated user.', []);
};


module.exports = {
  activateUserUseCase,
};
