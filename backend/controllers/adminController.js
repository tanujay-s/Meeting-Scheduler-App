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
}