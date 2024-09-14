// route for user to view meetings
const express = require('express');
const router = express.Router();
const userMeetingController = require('../controllers/userMeetingController');
const isAuthenticated = require('../middlewares/authMiddleware');

// Apply authentication middleware
router.use(isAuthenticated);

// User route to get their own meetings
router.get('/', userMeetingController.getUserMeetings);

module.exports = router;