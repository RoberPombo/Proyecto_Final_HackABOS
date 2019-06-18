'use strict';

// Local imports. ==================================================================================
const { CreateResponseModel } = require('./create.response.model');
const { CreateErrorResponseModel } = require('./create.error.response.model');
const { CreatePlayerModel } = require('./create.player.model');
const { CreateUserModel } = require('./create.user.model');
const { createHashPasswordEntitie, createUuidV4Entitie } = require('../entities');


module.exports = {
  CreateErrorResponseModel,
  CreateResponseModel,
  CreatePlayerModel,
  CreateUserModel: CreateUserModel(
    createHashPasswordEntitie,
    createUuidV4Entitie,
  ),
};
