import React from 'react';
import { useState } from 'react';
import { Box, Typography, Paper, styled, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import UserAvailability from './UserAvailability';
import ScheduleSession from './ScheduleSession';
import AdminManageSessions from './AdminManageSessions';

export default function AdminPage() {
    
    const [showAvailability, setShowAvailability] = useState(false);
    const [showScheduleSession, setShowScheduleSession] = useState(false);
    const [showManageSessions, setShowManageSessions] = useState(false);


    const handleViewAvailability = () => {
      setShowAvailability(!showAvailability);
      setShowScheduleSession(false);
      setShowManageSessions(false);
    };

    const handleScheduleSession = () => {
        setShowScheduleSession(!showScheduleSession);
        setShowAvailability(false); 
        setShowManageSessions(false);
      };

    const handleManageSessions = () => {
        setShowManageSessions(!showManageSessions);
        setShowScheduleSession(false);
        setShowAvailability(false);
      };  

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
    }));

    return (
        <Box sx={{ flexGrow: 1, marginTop: 25, }}>
            <Grid container spacing={6}
                justifyContent="center"
                alignItems="stretch"

            >

                <Grid item xs={12} md={4}>
                    <Item>
                        <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                            User Availability
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                            View and manage user availability for scheduling.
                        </Typography>
                        <Button variant="contained"  onClick={handleViewAvailability} sx={{ mt: 2 }}>
                        {showAvailability ? 'Hide Availability' : 'View Availability'}
                        </Button>
                        {showAvailability && <UserAvailability />}
                    </Item>
                </Grid>


                <Grid item xs={12} md={4}>
                    <Item>
                        <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                            Schedule Sessions
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                            Schedule meetings or sessions with users.
                        </Typography>
                        <Button variant="contained"   onClick={handleScheduleSession} sx={{ mt: 2 }}>
                        {showScheduleSession ? 'Hide Schedule Form' : 'Schedule Session'}
                        </Button>
                        {showScheduleSession && <ScheduleSession />}
                    </Item>
                </Grid>


                <Grid item xs={12} md={4}>
                    <Item>
                        <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                            Manage Sessions
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                            Reschedule or cancel existing sessions.
                        </Typography>
                        <Button variant="contained"  onClick={handleManageSessions} sx={{ mt: 2 }}>
                        {showManageSessions ? 'Hide Manage Sessions' : 'Manage Sessions'}
                        </Button>
                        {showManageSessions && <AdminManageSessions />}
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
