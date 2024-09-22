import React ,{useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
//import { styled } from '@mui/material/styles';
import axios from '../api/axios';



const UserPage = () => {
    const [meetings, setMeetings] = useState([]);

    // Fetch meetings from the backend
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get('/api/meetings'); // Adjust API route if needed
                setMeetings(response.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        };

        fetchMeetings();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <Box>
                    <Box sx={{ width: '100%', marginTop: 8, marginBottom: 3 }}>
                        <Grid 
                            container 
                            spacing={2} 
                            justifyContent={meetings.length === 1 ? 'center' : 'flex-start'} 
                            alignItems="center"
                        >
                            {meetings.length > 0 ? (
                                meetings.map((meeting, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Paper sx={{ padding: 2 }}>
                                            {/* Display meeting title */}
                                            <Typography variant="h6">
                                                {meeting.title}
                                            </Typography>
                                            
                                            {/* Display admin name or email */}
                                            <Typography variant="body2" color="text.secondary">
                                                Meeting with: {meeting.adminId?.name || meeting.adminId?.email}
                                            </Typography>
                                            
                                            {/* Display timeSlot (startTime and endTime) */}
                                            <Typography variant="body2" color="text.secondary">
                                                Time: {meeting.timeSlot.startTime} - {meeting.timeSlot.endTime}
                                            </Typography>
                                            
                                            {/* Display participants */}
                                            <Typography variant="body2" color="text.secondary">
                                                Participants: {meeting.participants.map(participant => participant.name || participant.email).join(', ')}
                                            </Typography>
                                            
                                            {/* Display meeting date */}
                                            <Typography variant="body2" color="text.secondary">
                                                Date: {new Date(meeting.date).toLocaleDateString()}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No meetings available
                                </Typography>
                            )}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default UserPage;
