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


const activateUserUseCase = async(activationCode, sport) => {
  const requiredFields = ['sport', 'activationCode'];
  const validInputData = await validateUserDataEntitie(
    { sport, activationCode: [{ uuid: activationCode }] }, requiredFields
  );

  const findedUser = await findUserRepositorie.byActivationCode(
    validInputData.activationCode[0].uuid, sport
  );
  if (findedUser[0].activatedAt > 0) throw CreateErrorResponseModel('Already active user.', 'activate.user.uc.js', {});

  const dateActivationCode = findedUser[0].activationCode.filter((code) => {
    if (code.uuid === activationCode) return true;
    return false;
  });

  const difDays = (Date.now() - dateActivationCode[0].sendAt) / (1000 * 60 * 60 * 24);
  if (difDays >= 1) {
    const newActivationCode = createUuidV4Entitie();
    await updateUserRepositorie.addActivationCode(findedUser[0]._id, findedUser[0].sport, newActivationCode);

    await sendEmailActivationEntitie(
      findedUser[0].email,
      newActivationCode,
      findedUser[0].sport,
      findedUser[0].language,
    );

    throw CreateErrorResponseModel('Expired activation code.', 'activate.user.uc.js', {});
  }

  const activatedUser = await updateUserRepositorie.activate(findedUser[0]._id, findedUser[0].sport);


  return CreateResponseModel('Activated user.', 'activate.user.uc.js', activatedUser);
};


module.exports = {
  activateUserUseCase,
};
