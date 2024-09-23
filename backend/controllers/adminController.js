// this is for the CRUD of meetings by admin
const Meeting = require('../models/meetingSchema');
const User = require('../models/userSchema');
const Availability = require('../models/scheduleSchema');

//admin creates new meeting with users in the time slot
exports.createMeeting = async (req, res) =>{
    try{
        const {title, participantsEmail, meetingType, date, startTime, endTime} = req.body;   
        const adminId = req.session.user._id;  
        
        if(!title || !participantsEmail || !meetingType || !date || !startTime || !endTime){
            return res.status(400).json({message:'All fields are required'});
        }
        
        const participants = await User.find({email: {$in: participantsEmail}});

        if(participants.length !== participantsEmail.length){
            return res.status(404).json({message:'Not all participants are found'});
        }

        const participantsIds = participants.map(user => user._id);

        //check if time slot is available for each participants
        for (const participantsId of participantsIds){
            const availability = await Availability.findOne({
                userId: participantsId,
                date,
                startTime:{$lte: startTime},//start time in slot should be less than meeting start time 
                endTime: {$gte: endTime}//end time in slot of user should be more than meeting end time
            });

            if(!availability){
                return res.status(400).json({
                    message: `Participant with email ${participantsEmail[participantsIds.indexOf(participantsId)]} is not available for the given time slot.`
                });
            }
        }

        //check if user has already a meeting in the slot that you are trying to book
        const overlap = await Meeting.find({
            date,
            $or : [
                {'timeSlot.startTime':{$lte: endTime}, 'timeSlot.endTime' :{$gte: startTime}}
            ],
            participants: { $in: participantsIds }
        });

        if (overlap.length > 0) {
            return res.status(400).json({ message: 'One or more participants are already booked for this time slot.' });
        }

        //now create meeting
        const newMeeting = new Meeting({
            adminId,
            title,
            meetingType,
            participants: participantsIds,
            date,
            timeSlot: {
                startTime, 
                endTime
            }
        });
        
        await newMeeting.save();
        res.status(200).json({message:'Meeting created successfully'});

    }
    catch (error) {
        console.error('Eror creating meetings: ', error);
        res.status(500).json({message:'Server Error', error});
    }
};

// to show created meetings
exports.getAllMeetings = async (req, res) =>{
    try{
            const meetings = await Meeting.find()
                .populate('participants', 'name email')
                .populate('adminId', 'name email');
            
            res.status(200).json(meetings);
    } catch (error){
        console.error('Error fetching all meetings:', error);
        res.status(500).json({message:'Server Error', error});
    }
};

//update meeting 
exports.updateMeeting = async (req, res) =>{
    try{
        const meetingId = req.params.id;
        const {date, startTime, endTime} = req.body;
        const adminId = req.session.user._id;

        const meeting = await Meeting.findOne({_id: meetingId, adminId});
        if(!meeting){
            return res.status(404).json({message:'Meeting not found'});
        }

         // Check if startTime is less than endTime
         if (startTime && endTime && startTime >= endTime) {
            return res.status(400).json({ message: 'Start time must be less than end time' });
        }

        // Check if given timeslot does not overlap with anyother meetings of users
        const participantsIds = meeting.participants;

        const overlap = await Meeting.findOne({
            _id: { $ne: meetingId }, 
            date: date || meeting.date, 
            participants: { $in: participantsIds },
            $or: [
                { 'timeSlot.startTime': { $lt: endTime }, 'timeSlot.endTime': { $gt: startTime } }
            ]
        });

        if (overlap) {
            return res.status(400).json({ message: 'The new time slot overlaps with an existing meeting.' });
        }


        if(date) meeting.date = date;
        if(startTime) meeting.timeSlot.startTime = startTime;
        if(endTime) meeting.timeSlot.endTime = endTime;

        await meeting.save();
        res.status(200).json({message:'Meeting updated successfully'});

    } catch (error) {
        console.error('Error updating meetings: ', error);
        res.status(500).json({message:'Server Error', error});
    }
};

//delete meeting
exports.deleteMeeting = async (req, res) =>{
    try{
        const meetingId = req.params.id;
        const adminId = req.session.user._id;

        const meeting = await Meeting.findOneAndDelete({_id: meetingId, adminId});

        if(!meeting){
            return res.status(404).json({message:'No meeting was found'});
        }
        res.status(200).json({message:'Meeting deleted successfully'});


    } catch (error) {
        console.error('Error deleting meeting: ', error);
        res.status(500).json({message:'Server Error', error});
    }
};

//Show users with their availability slot on admin panel 
exports.showUserAvailability = async (req, res) =>{
    try{
        const availability = await Availability.find().populate('userId', 'name email');
        res.status(200).json(availability);
    } catch (error) {
        console.error('Error showing user availability: ', error);
        res.status(500).json({message: 'Server error', error});
    }
};

//some changes to be made in frontend to show user availability ,
//admin can only view the availability slot but can not delete it or edit it
// admin can view user's name, email, date, start time and end time