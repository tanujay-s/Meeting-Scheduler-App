//register routes for user

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/', userController.registerUser);


module.exports = router;