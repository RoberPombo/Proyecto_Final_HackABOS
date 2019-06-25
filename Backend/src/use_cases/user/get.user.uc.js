'use strict';

// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
const { CreateResponseModel } = require('../models/create.response.model');
// Local imports: repositories =====================================================================
const { findUserRepositorie } = require('../../repositories/user/find.user.repositorie');


const getUserProfileUseCase = async(userId, sport) => {
  if (!userId && !sport) throw CreateErrorResponseModel('Unauthorized user.', 'get.profile.uc.js', {});

  const findedUser = await findUserRepositorie.byId(userId, sport);

  return CreateResponseModel('Sent user profile.', 'get.profile.uc.js', findedUser);
};


module.exports = {
  getUserProfileUseCase,
};
