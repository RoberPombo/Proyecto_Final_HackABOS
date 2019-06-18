'use strict';


const findUserRepositorie = (findUserDatasource, option) => async(filterValue) => {
  let findedUser;

  try {
    if (option === 'activationCode') {
      findedUser = await findUserDatasource.byActivationCode(filterValue);
    } else if (option === 'email') {
      findedUser = await findUserDatasource.byEmail(filterValue);
    } else if (option === 'id') {
      findedUser = await findUserDatasource.byId(filterValue);
    } else if (option === 'changePassword') {
      findedUser = await findUserDatasource.byChangePassword(filterValue);
    }
  } catch (e) {
    if (e.message.includes('ObjectId failed')) {
      return new Error('Invalid request data.');
    }
    return new Error('Internal server error.');
  }

  if (findedUser.length === 0) {
    return new Error('Invalid request data.');
  }

  return findedUser;
};


module.exports = {
  findUserRepositorie,
};
