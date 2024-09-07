var express = require('express');
var router = express.Router();
var ScheduleSchema = require('../models/scheduleSchema');
var UserSchema = require('../models/userSchema');

router.post('/', async (req, res) => {
    try {
        const { date, endTime, startTime, userId } = req.body;
        let obj = {
            "startTime": startTime,
            "endTime": endTime,
            "date": date
        }
        const users = await UserSchema.findByIdAndUpdate(
            userId,
            { schedules: [...obj] },
            { new: true }
        );
        res.status(201).json({status: "success", schedule: schedule});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/my-schedules', async (req, res) => {
    try {
        const schedules = await ScheduleSchema.find({});
        schedules.sort((a, b)=>{
            return b._id.getTimestamp() - a._id.getTimestamp()
        })
        res.status(200).json({message: 'success', schedules: schedules});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;