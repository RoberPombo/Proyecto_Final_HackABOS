'use strict';

// Imports modules npm. ============================================================================
const mongoose = require('mongoose');


const { Schema } = mongoose;

const PlayerSchema = new Schema({
  userId: String,
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
    videoId: String,
    views: Number,
    likes: String,
    publishedAt: String,
  }],
  createdAt: Number,
  modifiedAt: Number,
  deletedAt: Number,
});

const CreatePlayerModelData = sport => mongoose.model(`${sport}-player`, PlayerSchema);

module.exports = {
  CreatePlayerModelData,
};
