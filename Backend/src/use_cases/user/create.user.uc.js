'use strict';

// Local imports: use_cases/entities ===============================================================
const { sendEmailActivationEntitie } = require('../entities/send.email.activation.entitie');
const { validateUserDataEntitie } = require('../entities/validate.user.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateResponseModel } = require('../models/create.response.model');
const { CreateUserModel } = require('../models/create.user.model');
// Local imports: repositories =====================================================================
const { saveUserRepositorie } = require('../../repositories/user/save.user.repositorie');


const createUserUseCase = async(email, password, sport, language) => {
  const requiredFields = ['email', 'password', 'sport', 'language'];
  const validInputData = await validateUserDataEntitie({
    email, password, sport, language,
  }, requiredFields);

  const newUser = CreateUserModel(validInputData);

  const savedUser = await saveUserRepositorie(newUser);

  await sendEmailActivationEntitie(
    savedUser.email,
    savedUser.activationCode[0].uuid,
    savedUser.sport,
    savedUser.language,
  );

  return CreateResponseModel('Created user.', 'confirm.change.user.password.uc.js', savedUser);
};


module.exports = {
  createUserUseCase,
};
