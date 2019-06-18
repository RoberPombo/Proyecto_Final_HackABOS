'use strict';

// Imports modules npm. ============================================================================
const joi = require('@hapi/joi');


const validatePlayerDataEntitie = async(payload) => {
  const schema = joi.object({
    userId: joi.string().allow(''),
    fullName: joi.string().allow(''),
    birthdate: joi.number().allow(''),
    nationality: joi.string().allow(''),
    age: joi.allow(''),
    height: joi.allow(),
    weight: joi.allow(),
    sport: joi.string().allow(''),
    team: joi.string().allow(''),
    preferredFoot: joi.string().allow(''),
    preferredPositions: joi.array(),
    videos: joi.array(),
    createdAt: joi.allow(),
    modifiedAt: joi.allow(),
    deletedAt: joi.allow(),
  }).options({ abortEarly: false });

  try {
    await joi.validate(payload, schema);

    return true;
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
  validatePlayerDataEntitie,
};
