'use strict';


const updateUserRepositorie = (
  updateUserDatasource, option,
) => async(userId, dataUpdate) => {
  let updatedUser;


  try {
    if (option === 'activate') {
      updatedUser = await updateUserDatasource.activate(userId, dataUpdate);
    } else if (option === 'confirmChangePassword') {
      updatedUser = await updateUserDatasource.confirmChangePassword(userId, dataUpdate);
    } else if (option === 'addActivationCode') {
      updatedUser = await updateUserDatasource.addActivationCode(userId, dataUpdate);
    } else if (option === 'profile') {
      updatedUser = await updateUserDatasource.profile(userId, dataUpdate);
    } else if (option === 'delete') {
      updatedUser = await updateUserDatasource.delete(userId, '');
    } else if (option === 'changePassword') {
      updatedUser = await updateUserDatasource.changePassword(userId, dataUpdate);
    }
  } catch (e) {
    return new Error('Internal server error.');
  }


  return updatedUser;
};


module.exports = {
  updateUserRepositorie,
};
