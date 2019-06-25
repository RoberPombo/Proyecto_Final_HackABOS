'use strict';

// Local imports: use_cases/entities ===============================================================
const { createUuidV4Entitie } = require('../entities/create.uuid.v4.entitie');
const { sendEmailActivationEntitie } = require('../entities/send.email.activation.entitie');
const { validateUserDataEntitie } = require('../entities/validate.user.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { findUserRepositorie } = require('../../repositories/user/find.user.repositorie');
const { updateUserRepositorie } = require('../../repositories/user/update.user.repositorie');


const sendEmailActivationUseCase = async(email, sport) => {
  const requiredFields = ['email', 'sport'];
  const validInputData = await validateUserDataEntitie({ email, sport }, requiredFields);


  const findedUser = await findUserRepositorie.byEmail(validInputData.email, validInputData.sport);
  if (findedUser[0].activatedAt > 0) {
    throw CreateErrorResponseModel('Already active user.', 'send.email.activation.uc.js', []);
  }

  const newActivationCode = createUuidV4Entitie();
  const updatedUser = await updateUserRepositorie.addActivationCode(findedUser[0]._id, findedUser[0].sport, newActivationCode);

  await sendEmailActivationEntitie(
    findedUser[0].email,
    newActivationCode,
    validInputData.sport,
    findedUser[0].language,
  );


  return CreateResponseModel('Activation email sent.', 'send.email.activation.uc.js', updatedUser);
};


module.exports = {
  sendEmailActivationUseCase,
};
