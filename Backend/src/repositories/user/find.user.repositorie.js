'use strict';

// Local imports: datasources ======================================================================
const { findUserDatasource } = require('../../datasources/mongoDb/user/find.user.data');
// Local imports: use_cases/models =================================================================
const { CreateErrorResponseModel } = require('../../use_cases/models/create.error.response.model');


const findUserRepositorie = option => async(filterValue, sport) => {
  let findedUser;
  try {
    if (option === 'activationCode') {
      findedUser = await findUserDatasource.byActivationCode(filterValue, sport);
    } else if (option === 'email') {
      findedUser = await findUserDatasource.byEmail(filterValue, sport);
    } else if (option === 'id') {
      findedUser = await findUserDatasource.byId(filterValue, sport);
    } else if (option === 'changePassword') {
      findedUser = await findUserDatasource.byChangePassword(filterValue, sport);
    }
  } catch (error) {
    if (error.message.includes('ObjectId failed')) {
      throw CreateErrorResponseModel('Invalid request data.', 'find.user.repositorie.js', error);
    }
    throw CreateErrorResponseModel('Internal server error.', 'find.user.repositorie.js', error);
  }

  if (findedUser.length === 0) {
    throw CreateErrorResponseModel('Invalid request data.', 'find.user.repositorie.js', findedUser);
  }


  return findedUser;
};


module.exports = {
  findUserRepositorie: {
    byActivationCode: findUserRepositorie('activationCode'),
    byChangePassword: findUserRepositorie('changePassword'),
    byEmail: findUserRepositorie('email'),
    byId: findUserRepositorie('id'),
  },
};
