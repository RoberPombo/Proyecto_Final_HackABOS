'use strict';

// Imports modules npm. ============================================================================
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');


const configRoutes = express.Router();


configRoutes.use(helmet());

configRoutes.use(bodyParser.json());

configRoutes.use(cors());


module.exports = {
  configRoutes,
};
