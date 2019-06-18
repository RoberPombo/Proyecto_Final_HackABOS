'use strict';


/**
 * @param {IcreateHashPasswordEntitie} createHashPasswordEntitie
 * @param {IcreateUuidV4Entitie} createUuidV4Entitie
 *
 * @return {ICreateUserModel}
 */
const CreateUserModel = (
  createHashPasswordEntitie,
  createUuidV4Entitie,
) => ({ email, password, language }) => {
  try {
    return {
      email,
      password: createHashPasswordEntitie(password),
      role: 'user',
      language,
      sport: 'soccer',
      createdAt: Date.now(),
      modifiedAt: 0,
      deletedAt: 0,
      activatedAt: 0,
      agentOf: {
        playerId: null,
        sport: null,
        createdAt: null,
        deletedAt: null,
      },
      profile: {
        fullName: '',
        document: '',
        address1: '',
        address2: '',
        city: '',
        country: '',
      },
      contact: {
        phone: '',
        mobile: '',
        email,
        other: '',
      },
      changePassword: {
        uuid: '',
        password: '',
        sendAt: 0,
      },
      activationCode: [{
        uuid: createUuidV4Entitie(),
        sendAt: Date.now(),
      }],
    };
  } catch (e) {
    return e;
  }
};


module.exports = {
  CreateUserModel,
};
