'use strict';

// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const { authRoutes } = require('./auth.routes');
const { playerRoutes } = require('./player.routes');
const { userRoutes } = require('./user.routes');


const routes = express.Router();


routes.use('/user', userRoutes);

routes.use('/', authRoutes);

routes.use('/players', playerRoutes);


module.exports = {
  routes,
};
