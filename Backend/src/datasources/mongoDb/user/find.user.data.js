'use strict';

// Local imports: this module ======================================================================
const { CreateUserModelData } = require('./user.model.data');


const findUserDatasource = option => async(filterValue, sport) => {
  const projection = {
    __v: 0,
  };
  let filter;
  if (option === 'activationCode') {
    filter = {
      activationCode: {
        $elemMatch: {
          uuid: filterValue,
        },
      },
    };
  } else if (option === 'email') {
    filter = {
      email: filterValue,
      deletedAt: 0,
    };
  } else if (option === 'id') {
    filter = {
      _id: filterValue,
      deletedAt: 0,
    };
  } else if (option === 'changePassword') {
    filter = {
      'changePassword.uuid': filterValue,
      deletedAt: 0,
    };
  }

  const UserModelData = await CreateUserModelData(sport);

  const findedUsers = await UserModelData.find(filter, projection).lean();


  return findedUsers;
};


module.exports = {
  findUserDatasource: {
    byActivationCode: findUserDatasource('activationCode'),
    byChangePassword: findUserDatasource('changePassword'),
    byEmail: findUserDatasource('email'),
    byId: findUserDatasource('id'),
  },
};
