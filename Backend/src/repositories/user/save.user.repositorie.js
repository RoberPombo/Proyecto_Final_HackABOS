'use strict';

// Local imports: datasources ======================================================================
const { saveUserDatasource } = require('../../datasources/mongoDb/user/save.user.data');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../../use_cases/models/create.error.response.model');


const saveUserRepositorie = async(userData) => {
  try {
    return await saveUserDatasource(userData);
  } catch (error) {
    if (error.message.includes('email_1 dup key')) {
      throw CreateErrorResponseModel('User already exists in database.', 'save.user.repositorie.js', error);
    } else if (error.message === 'User not updated.') {
      throw CreateErrorResponseModel('Invalid request data.', 'save.user.repositorie.js', error);
    }
    throw CreateErrorResponseModel('Internal server error.', 'save.user.repositorie.js', error);
  }
};


module.exports = {
  saveUserRepositorie,
};
