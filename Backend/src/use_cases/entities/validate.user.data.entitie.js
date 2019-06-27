'use strict';

/* eslint-disable security/detect-object-injection */
/* eslint-disable no-param-reassign */

// Imports modules npm. ============================================================================
const joi = require('@hapi/joi');
const { ObjectId } = require('mongoose').Types;
// Local imports: this module ======================================================================
const { CreateErrorResponseModel } = require('../models/create.error.response.model');
// Local imports: config ===========================================================================
const {
  languageOptions, preferredPositionsOptions, roleOptions, sportOptions, whiteList,
} = require('../../config/config.api');


const optionsSchema = {
  _id: joi.any().invalid('invalid'),
  email: joi.string().email().regex(whiteList).required(),
  password: joi.string().required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.+?[#?!@$%^&*-.]*).{8,}$/),
  language: joi.any().valid(languageOptions).required(),
  role: joi.any().valid(roleOptions).required(),
  sport: joi.any().valid(sportOptions).required(),
  agentOf: {
    playerId: joi.any().invalid('invalid'),
    sport: joi.any().valid(sportOptions).required(),
  },
  profile: {
    fullName: joi.string().allow('').regex(whiteList),
    document: joi.string().allow('').regex(whiteList),
    address1: joi.string().allow('').regex(whiteList),
    address2: joi.string().allow('').regex(whiteList),
    city: joi.string().allow('').regex(whiteList),
    country: joi.string().allow('').regex(whiteList),
  },
  changePassword: {
    uuid: joi.string().guid({ version: ['uuidv4'] }),
    password: joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.+?[#?!@$%^&*-.]*).{8,}$/),
  },
  contact: {
    phone: joi.string().allow('').regex(whiteList),
    mobile: joi.string().allow('').regex(whiteList),
    email: joi.string().allow('').email().regex(whiteList),
    other: joi.string().allow('').regex(whiteList),
  },
  activationCode: joi.array().items({
    uuid: joi.string().guid({ version: ['uuidv4'] }),
    sport: joi.any().valid(sportOptions),
  }),
  messages: joi.array().items({
    userId: joi.any().invalid('invalid'),
    message: joi.string().regex(whiteList),
  }),
  favoritePlayers: joi.array().items({
    playerId: joi.any().invalid('invalid'),
    fullName: joi.string().allow('').regex(whiteList),
    preferredPositions: joi.array().items(
      joi.any().valid(preferredPositionsOptions),
    ).required(),
  }),
};


const validateUserDataEntitie = async(payload, requiredFields) => {
  const newPayload = Object.keys(payload).reduce((c, k) => {
    let auxValue = payload[k];
    if (requiredFields.indexOf(k) === -1 || !auxValue) return c;
    if (k === '_id') {
      auxValue = ObjectId.isValid(auxValue) ? auxValue : 'invalid';
    } else if (typeof auxValue === 'string' && k !== 'password') {
      auxValue = auxValue.toLowerCase().trim();
    } else if (k === 'agentOf') {
      auxValue.playerId = ObjectId.isValid(auxValue.playerId) ? auxValue.playerId : 'invalid';
    } else if (k === 'profile') {
      if (auxValue.fullName) auxValue.fullName = auxValue.fullName.toLowerCase().trim();
      if (auxValue.document) auxValue.document = auxValue.document.toLowerCase().trim();
      if (auxValue.address1) auxValue.address1 = auxValue.address1.toLowerCase().trim();
      if (auxValue.address2) auxValue.address2 = auxValue.address2.toLowerCase().trim();
      if (auxValue.city) auxValue.city = auxValue.city.toLowerCase().trim();
      if (auxValue.country) auxValue.country = auxValue.country.toLowerCase().trim();
    } else if (k === 'contact') {
      if (auxValue.phone) auxValue.phone = auxValue.phone.toLowerCase().trim();
      if (auxValue.mobile) auxValue.mobile = auxValue.mobile.toLowerCase().trim();
      if (auxValue.email) auxValue.email = auxValue.email.toLowerCase().trim();
      if (auxValue.other) auxValue.other = auxValue.other.toLowerCase().trim();
    } else if (k === 'messages') {
      if (auxValue.userId) auxValue.userId = ObjectId.isValid(auxValue.userId) ? auxValue.userId : 'invalid';
      if (auxValue.message) auxValue.message = auxValue.message.toLowerCase().trim();
    } else if (k === 'favoritePlayers') {
      auxValue[0].playerId = ObjectId.isValid(auxValue[0].playerId) ? auxValue[0].playerId : 'invalid';
    }

    if (optionsSchema[k]) {
      c.data[k] = auxValue;
      c.schema[k] = optionsSchema[k];
    }

    return c;
  }, { data: {}, schema: {} });

  try {
    const schema = joi.object(
      newPayload.schema
    ).options({ abortEarly: false });

    await joi.validate(newPayload.data, schema);

    return newPayload.data;
  } catch (e) {
    const dataError = e.details
      .map(error => error.context.label)
      .filter((error, index, array) => {
        const indexFind = array.indexOf(error);
        if (indexFind === index) return true;
        return false;
      });

    throw CreateErrorResponseModel('Wrong input data.', 'validate.user.data.entitie.js', dataError);
  }
};


module.exports = {
  validateUserDataEntitie,
};
