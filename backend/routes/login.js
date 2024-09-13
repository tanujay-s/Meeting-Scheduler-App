//login routes for user

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User login
router.post('/', userController.loginUser);


module.exports = router;