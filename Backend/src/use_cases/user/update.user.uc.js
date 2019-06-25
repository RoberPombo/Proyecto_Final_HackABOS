'use strict';

// Local imports: use_cases/entities ===============================================================
const { validateUserDataEntitie } = require('../entities/validate.user.data.entitie');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { updateUserRepositorie } = require('../../repositories/user/update.user.repositorie');


const updateUserProfileUseCase = async(userId, sport, userProfile) => {
  if (!userId || !sport) throw CreateErrorResponseModel('Unauthorized user.', 'update.profile.uc.js', []);

  const requiredFields = ['language', 'profile', 'contact'];
  const validInputData = await validateUserDataEntitie(userProfile, requiredFields);

  const updatedProfile = await updateUserRepositorie.profile(userId, sport, validInputData);
  if (!updatedProfile || updatedProfile.deletedAt > 0) {
    throw CreateErrorResponseModel('User does not exist.', 'update.profile.uc.js', {});
  }

  return CreateResponseModel('Updated user profile.', 'update.profile.uc.js', updatedProfile);
};


module.exports = {
  updateUserProfileUseCase,
};
