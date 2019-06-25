'use strict';

// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
const { validateUserDataEntitie } = require('../entities/validate.user.data.entitie');
// Local imports: repositories =====================================================================
const { findUserRepositorie } = require('../../repositories/user/find.user.repositorie');
const { updateUserRepositorie } = require('../../repositories/user/update.user.repositorie');


const confirmChangeUserPasswordUseCase = async(confirmCode, sport) => {
  const requiredFields = ['sport', 'changePassword'];
  const validInputData = await validateUserDataEntitie(
    { sport, changePassword: { uuid: confirmCode } }, requiredFields
  );

  const findedUser = await findUserRepositorie.byChangePassword(
    validInputData.changePassword.uuid, validInputData.sport
  );

  const dateConfirmCode = findedUser[0].changePassword.sentAt;
  const difDays = (Date.now() - dateConfirmCode) / (1000 * 60 * 60 * 24);
  if (difDays >= 1) throw CreateErrorResponseModel('Confirmation email expired.', 'confirm.change.user.password.uc.js', []);


  const updatedUser = await updateUserRepositorie.confirmChangePassword(
    findedUser[0]._id, findedUser[0].sport,
    { password: findedUser[0].changePassword.password },
  );


  return CreateResponseModel('Password changed.', 'confirm.change.user.password.uc.js', updatedUser);
};


module.exports = {
  confirmChangeUserPasswordUseCase,
};
