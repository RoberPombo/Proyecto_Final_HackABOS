'use strict';


const findUserDatasource = (UserDataModel, option) => async(filterValue) => {
  let projection;
  let filter;


  if (option === 'activationCode') {
    projection = {
      __v: 0,
    };
    filter = {
      activationCode: {
        $elemMatch: {
          uuid: filterValue,
        },
      },
    };
  } else if (option === 'email') {
    projection = {
      __v: 0,
    };
    filter = {
      email: filterValue,
      deletedAt: 0,
    };
  } else if (option === 'id') {
    projection = {
      activationCode: 0,
      deletedAt: 0,
      createdAt: 0,
      __v: 0,
    };
    filter = {
      _id: filterValue,
      deletedAt: 0,
    };
  } else if (option === 'changePassword') {
    projection = {
      __v: 0,
    };
    filter = {
      'changePassword.uuid': filterValue,
      deletedAt: 0,
    };
  }


  const findedUsers = await UserDataModel.find(filter, projection).lean();
  return findedUsers;
};


module.exports = {
  findUserDatasource,
};
