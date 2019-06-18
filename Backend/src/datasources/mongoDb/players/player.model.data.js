'use strict';

// Imports modules npm. ============================================================================
const mongoose = require('mongoose');


const { Schema } = mongoose;

const PlayerSchema = new Schema({
  userId: {
    type: String,
    unigue: true,
  },
  fullName: String,
  birthdate: Number,
  nationality: String,
  height: Number,
  weight: Number,
  sport: String,
  team: String,
  preferredFoot: String,
  preferredPositions: [],
  videos: [{
    uriVide: String,
    scores: Number,
    views: Number,
    comments: [],
  }],
  createdAt: Number,
  modifiedAt: Number,
  deletedAt: Number,
});

const CreatePlayerModelData = sport => mongoose.model(`${sport}-player`, PlayerSchema);

module.exports = {
  CreatePlayerModelData,
};
