'use strict';


// Imports modules npm. ============================================================================
const express = require('express');
// Local imports. ==================================================================================
const { loginController } = require('../controllers/auth/login.controller');
const { refreshTokenController } = require('../controllers/auth/refresh.token.controller');


const authRoutes = express.Router();


authRoutes.post('/login', loginController);

authRoutes.get('/refreshToken', refreshTokenController);


module.exports = {
  authRoutes,
};
