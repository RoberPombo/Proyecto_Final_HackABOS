'use strict';

// Local imports: use_cases/entities ===============================================================
const { createHashPasswordEntitie } = require('../entities/hash.password.entitie');
const { createUuidV4Entitie } = require('../entities/create.uuid.v4.entitie');


const CreateUserModel = ({
  email, password, sport, language,
}) => ({
  email,
  password: createHashPasswordEntitie(password),
  role: 'user',
  language,
  sport,
  createdAt: Date.now(),
  modifiedAt: 0,
  deletedAt: 0,
  activatedAt: 0,
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
  activationCode: [{
    uuid: createUuidV4Entitie(),
    sendAt: Date.now(),
  }],
});


module.exports = {
  CreateUserModel,
};
