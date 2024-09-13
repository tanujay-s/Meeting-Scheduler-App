const Availability = require('../models/scheduleSchema');

// add new availability slot

exports.addAvailability = async (req, res) =>{
    try{
       
        const {date, startTime, endTime} = req.body;
        const userId = req.session.user._id;

        if(!date || !startTime || !endTime) {
            return res.status(400).json({message:'All fields are required'});
        }

        const newAvailability = new Availability({
            userId,
            date,
            startTime,
            endTime
        });
        await newAvailability.save();
        res.status(201).json({message:'Slot added successfully'});

    } catch (error) {
        console.error('Error adding availability:', error);
        res.status(500).json({message:'Server error', error});
    }
};

//display availability slots

exports.getAvailability = async (req, res) =>{
    try{
            const userId = req.session.user._id;
            
            const availabilitySlots = await Availability.find({userId}).sort({date:1});

            res.status(200).json({availabilitySlots});
    } catch (error) {
             console.error('Error fetching availability:', error);
            res.status(500).json({message:'Server error', error});
    }
};

// update a slot
exports.updateAvailability = async (req, res) =>{
    try{
            const availabilityId = req.params.id;
            const {date, startTime, endTime} = req.body;
            const userId = req.session.user._id;

            const available = await Availability.findOne({_id: availabilityId, userId});

            if(!available){
                return res.status(404).json({message: 'Availability slot not found'});
            }

            if(date) available.date = date;
            if(startTime) available.startTime = startTime;
            if(endTime) available.endTime = endTime;

            await available.save();
            res.status(200).json({message: ' Slot updated successfully'});

    } catch (error) {
            console.error('Error updating slots: ', error);
            res.status(500).json({message:'Server Error', error});
    }
};

//delete a slot

exports.deleteAvailability = async (req, res) =>{
    try{

            const availabilityId = req.params.id;
            const userId = req.session.user._id;

            const availability = await Availability.findOneAndDelete({_id: availabilityId, userId});
            if(!availability){
                return res.status(404).json({messgae:'Slot not found'});
            }

            res.status(200).json({message:'Slot deleted successfully'});

    } catch (error) {
            console.error('Error deleting slot: ', error);
            res.status(500).json({message:'Server Error', error});
    }
}