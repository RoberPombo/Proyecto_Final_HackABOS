'use strict';

// Local imports: this module ======================================================================
const { CreateUserModelData } = require('./user.model.data');


const saveUserDatasource = async(userData) => {
  const UserModelData = await CreateUserModelData(userData.sport);

  const savedUser = await UserModelData.create(userData);

  return savedUser;
};


module.exports = {
  saveUserDatasource,
};
