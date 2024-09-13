// admin role to add create meetings
const express = require('express');
const router = express.Router();
const  adminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/adminauthMiddleware');
const isAuthenticated = require('../middlewares/authMiddleware');

//middlewares to check user is logged in and it is an admin
router.use(isAuthenticated);
router.use(isAdmin);

//create meetings
router.post('/',adminController.createMeeting);

module.exports = router;