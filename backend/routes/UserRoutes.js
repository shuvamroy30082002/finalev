const express = require('express');

const { authMiddleware } = require('../middlewares/Auth');

const router = express.Router();

//  routes
router.post('/register', register);
router.post('/login', login);

// Update user credentials
router.put('/update', authMiddleware, update);

// Delete user account
router.delete('/delete', authMiddleware, );

module.exports = router;