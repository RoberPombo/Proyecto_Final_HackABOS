'use strict';


const saveUserDatasource = UserModelData => async(userData) => {
  const savedUser = await UserModelData.create(userData);

  return savedUser;
};


module.exports = {
  saveUserDatasource,
};
