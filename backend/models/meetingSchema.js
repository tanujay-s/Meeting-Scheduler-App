const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
        adminId : {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
        title : {type: String, required: true},
        meetingType:{type: String, enum: ['One to one', 'Many'], required: true},
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        date: { type: Date, required: true },
        timeSlot: {
                startTime: {type: String, required: true},
                endTime: { type: String, required: true}
        },
        createdAt: { type: Date, default: Date.now } 
});
 
module.exports = mongoose.model('Meeting', meetingSchema);
