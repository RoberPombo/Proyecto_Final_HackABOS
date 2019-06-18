'use strict';


// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const {
  loginController,
  refreshTokenController,
} = require('../controllers/auth');


const authRoutes = express.Router();


authRoutes.post('/login', loginController);

authRoutes.get('/refreshToken', refreshTokenController);


module.exports = {
  authRoutes,
};
