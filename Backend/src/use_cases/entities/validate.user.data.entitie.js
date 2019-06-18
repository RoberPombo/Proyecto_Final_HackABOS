'use strict';

// Imports modules npm. ============================================================================
const joi = require('@hapi/joi');


/**
 * @type {IvalidateUserDataEntitie}
*/
const validateUserDataEntitie = async(payload) => {
  const schema = joi.object({
    _id: joi.allow(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.+?[#?!@$%^&*-.]*).{8,}$/),
    language: joi.string().min(2).max(2),
    sport: joi.string().allow(''),
    contactBy: joi.string().allow(''),
    role: joi.string().allow(''),
    deletedAt: joi.allow(),
    createdAt: joi.allow(),
    modifiedAt: joi.allow(),
    activatedAt: joi.allow(),
    agentOf: {
      playerId: joi.string().allow(null),
      sport: joi.string().allow(null),
      createdAt: joi.string().allow(null),
      deletedAt: joi.string().allow(null),
    },
    profile: {
      fullName: joi.string().allow(''),
      document: joi.string().allow(''),
      address1: joi.string().allow(''),
      address2: joi.string().allow(''),
      city: joi.string().allow(''),
      country: joi.string().allow(''),
    },
    changePassword: {
      uuid: joi.string().allow(null),
      password: joi.string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.+?[#?!@$%^&*-.]*).{8,}$/)
        .required(),
      sendAt: joi.allow(),
    },
    contact: {
      phone: joi.string().allow(''),
      mobile: joi.string().allow(''),
      email: joi.string().allow(''),
      other: joi.string().allow(''),
    },
    activationCode: joi.array(),
  }).options({ abortEarly: false });

  try {
    await joi.validate(payload, schema);

    return [];
  } catch (e) {
    const dataError = e.details
      .map(error => error.context.label)
      .filter((error, index, array) => {
        const indexFind = array.indexOf(error);
        if (indexFind === index) return true;
        return false;
      });

    return dataError;
  }
};


module.exports = {
  validateUserDataEntitie,
};
