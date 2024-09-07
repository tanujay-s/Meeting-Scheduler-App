const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);