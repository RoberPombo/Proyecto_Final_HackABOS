'use strict';


const confirmChangeUserPasswordUseCase = ({
  CreateErrorResponseModel,
  CreateResponseModel,
  confirmChangeUserPasswordRepositorie,
  findUserByChangePassword,
}) => async(confirmCode) => {
  if (!confirmCode) return CreateErrorResponseModel('Invalid request data.', []);


  const findedUser = await findUserByChangePassword(confirmCode);
  if (findedUser instanceof Error) return CreateErrorResponseModel(findedUser.message, findedUser);


  const dateConfirmCode = findedUser[0].changePassword.sentAt;
  const difDays = (Date.now() - dateConfirmCode) / (1000 * 60 * 60 * 24);
  if (difDays >= 1) return CreateErrorResponseModel('Confirmation email expired.', []);


  const updatedUser = await confirmChangeUserPasswordRepositorie(
    findedUser[0]._id,
    { password: findedUser[0].changePassword.password },
  );
  if (updatedUser instanceof Error) {
    return CreateErrorResponseModel(updatedUser.message, updatedUser);
  }


  return CreateResponseModel('Password changed.', []);
};


module.exports = {
  confirmChangeUserPasswordUseCase,
};
