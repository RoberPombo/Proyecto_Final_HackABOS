'use strict';

// Imports modules npm. ============================================================================
const mongoose = require('mongoose');


const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  language: String,
  role: String,
  sport: String,
  activatedAt: Number,
  createdAt: Number,
  modifiedAt: Number,
  deletedAt: Number,
  agentOf: {
    playerId: Schema.Types.ObjectId,
    sport: String,
    createdAt: Number,
    deletedAt: Number,
  },
  profile: {
    fullName: String,
    document: String,
    address1: String,
    address2: String,
    city: String,
    country: String,
  },
  contact: {
    phone: String,
    mobile: String,
    email: String,
    other: String,
  },
  changePassword: {
    uuid: String,
    password: String,
    sendAt: Number,
  },
  activationCode: [{
    uuid: String,
    sport: String,
    sendAt: Number,
  }],
  messages: [{
    userId: String,
    message: String,
    sendAt: Number,
    readAt: Number,
  }],
  favoritePlayers: [{
    playerId: String,
  }],
});


const CreateUserModelData = sport => mongoose.model(`${sport}-user`, UserSchema);


module.exports = {
  CreateUserModelData,
};
