const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/login', userController.loginUser);

router.post('/register', userController.createUser);

router.post('/logout', userController.logoutUser);

module.exports = router;