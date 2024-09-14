const Meeting = require('../models/meetingSchema');

exports.getUserMeetings = async (req, res) => {
    try {
        const userId = req.session.user._id;

        const meetings = await Meeting.find({
            participants: userId
        })
        .populate('participants', 'name email')
        .populate('adminId', 'name email');

        res.status(200).json(meetings);
    } catch (error) {
        console.error('Error fetching user meetings:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

