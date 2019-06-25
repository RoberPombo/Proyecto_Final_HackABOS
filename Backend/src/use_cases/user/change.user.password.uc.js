'use strict';

// Local imports: use_cases/entities ===============================================================
const { createHashPasswordEntitie } = require('../entities/hash.password.entitie');
const { createUuidV4Entitie } = require('../entities/create.uuid.v4.entitie');
const { sendConfirmChangePasswordEntitie } = require('../entities/send.confirm.change.password.entitie');
const { validateUserDataEntitie } = require('../entities/validate.user.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { findUserRepositorie } = require('../../repositories/user/find.user.repositorie');
const { updateUserRepositorie } = require('../../repositories/user/update.user.repositorie');


const changeUserPasswordUseCase = async(email, password, sport) => {
  const requiredFields = ['email', 'password', 'sport'];
  const validInputData = await validateUserDataEntitie({ email, password, sport }, requiredFields);

  const findedUser = await findUserRepositorie.byEmail(validInputData.email, validInputData.sport);

  const securePassword = createHashPasswordEntitie(validInputData.password);
  const uuid = createUuidV4Entitie();

  const updatedUser = await updateUserRepositorie.changePassword(
    findedUser[0]._id, findedUser[0].sport, { uuid, securePassword },
  );


  await sendConfirmChangePasswordEntitie(
    findedUser[0].email,
    uuid,
    findedUser[0].sport,
    findedUser[0].language,
  );


  return CreateResponseModel('Sent email to confirm password change.', 'change.user.password.uc.js', updatedUser);
};


module.exports = {
  changeUserPasswordUseCase,
};
