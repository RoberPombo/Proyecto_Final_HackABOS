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
  maxResultsSearch, orderSearchOptions, preferredPositionsOptions,
  preferredFootOptions, sportOptions, nationalityOptions, whiteList,
} = require('../../config/config.api');


const optionsSchema = {
  _id: joi.any().invalid('invalid'),
  fullName: joi.string().regex(whiteList),
  birthdate: joi.date().timestamp().required(),
  nationality: joi.any().valid(nationalityOptions).required(),
  sport: joi.any().valid(sportOptions).required(),
  team: joi.string().regex(whiteList),
  weight: joi.number().min(20).max(150).required(),
  height: joi.number().min(1).max(2.40).required(),
  preferredFoot: joi.any().valid(preferredFootOptions).required(),
  preferredPositions: joi.array().items(
    joi.any().valid(preferredPositionsOptions),
  ).required(),
  videos: joi.array().items({
    videoId: joi.string().regex(whiteList),
    views: joi.number().greater(0),
    likes: joi.string().regex(whiteList),
    publishedAt: joi.date().timestamp(),
  }),
  filter: joi.string().regex(whiteList),
  page: joi.string().regex(whiteList),
  maxResults: joi.any().valid(maxResultsSearch),
  order: joi.any().valid(orderSearchOptions),
};


const validatePlayerDataEntitie = async(payload, requiredFields) => {
  const newPayload = Object.keys(payload).reduce((c, k) => {
    let auxValue = payload[k];
    if (requiredFields.indexOf(k) === -1) return c;
    if (k === '_id') {
      auxValue = ObjectId.isValid(auxValue) ? auxValue : 'invalid';
    } else if (k === 'fullName' || k === 'team') {
      auxValue = auxValue.toLowerCase().trim();
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
  } catch (error) {
    const dataError = error.details
      .map((err) => {
        if (Number(err.context.label)) {
          return `${err.path[0]} ['${err.context.value}',]`;
        }
        return err.context.label;
      })
      .filter((err, index, array) => {
        const indexFind = array.indexOf(err);
        if (indexFind === index) return true;
        return false;
      });

    throw CreateErrorResponseModel('Wrong input data.', 'validate.player.data.entitie.js', dataError);
  }
};


module.exports = {
  validatePlayerDataEntitie,
};
