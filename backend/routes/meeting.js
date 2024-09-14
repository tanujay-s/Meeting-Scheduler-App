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

//show all meetings to admin but only specified ones to user
router.get('/',adminController.getAllMeetings);

//show all users with their availability slots
router.get('/users',adminController.showUserAvailability);

//Reschedulen the meetings
router.put('/:id',adminController.updateMeeting);

//Delete the meeting
router.delete('/:id',adminController.deleteMeeting);

module.exports = router;