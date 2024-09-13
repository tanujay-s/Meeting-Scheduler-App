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
//some of the functionalities are chnaged from the current UI in admin schedule session 
//time slot is changed to add starttime and end time
//a new input field title is added
// meeting type should be correct exactly the same string in the form like here in the shcema
// date is also added as a new field