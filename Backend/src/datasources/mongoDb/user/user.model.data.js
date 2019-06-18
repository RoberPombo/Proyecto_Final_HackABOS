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
  role: String,
  createdAt: Number,
  modifiedAt: Number,
  deletedAt: Number,
  activatedAt: Number,
  language: String,
  sport: String,
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
    uuid: {
      type: String,
      unique: true,
    },
    sendAt: Number,
  }],
});


const UserModelData = mongoose.model('user', UserSchema);


module.exports = {
  UserModelData,
};
