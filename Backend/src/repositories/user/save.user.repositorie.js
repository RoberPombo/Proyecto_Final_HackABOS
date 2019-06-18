'use strict';


const saveUserRepositorie = saveUserDatasource => async(userData) => {
  try {
    return await saveUserDatasource(userData);
  } catch (e) {
    if (e.message.includes('email_1 dup key')) {
      return new Error('User already exists in database.');
    }
    return new Error('Internal server error.');
  }
};


module.exports = {
  saveUserRepositorie,
};
