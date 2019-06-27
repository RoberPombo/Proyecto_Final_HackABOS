'use strict';

// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const { authRoutes } = require('./auth.routes');
const { playerRoutes } = require('./player.routes');
const { userRoutes } = require('./user.routes');


const routes = express.Router();


routes.use('/players', playerRoutes);

routes.use('/user', userRoutes);

routes.use('/', authRoutes);


module.exports = {
  routes,
};
