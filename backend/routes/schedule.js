var express = require('express');
var router = express.Router();
var scheduleController = require('../controllers/scheduleController');
var isAuthenticated = require('../middlewares/authMiddleware');


// Apply authentication middleware to all routes in this router
router.use(isAuthenticated);

//adding slots
router.post('/', scheduleController.addAvailability);

// showing available slots
router.get('/', scheduleController.getAvailability);

//update slot
router.put('/:id', scheduleController.updateAvailability);

//delete slot 
router.delete('/:id', scheduleController.deleteAvailability);

module.exports = router;