import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import AvailableMeetings from './AvailableMeetings';
import UserPageAvailability from './UserPageAvailability';


export default function SimpleContainer() {

    const [viewForm, setForm] = useState(false);

    const manageViewForm = () => {
        setForm(!viewForm);
    }

    const formattedDate = new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ marginTop: 15, textAlign: 'center' }}>
                {/* Box for current Date */}
                <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
                    <Typography variant="h4" component="h1">
                        {formattedDate}
                    </Typography>
                </Box>
                <Button variant="contained" onClick={manageViewForm} sx={{ marginTop: 5 }}>
                    {viewForm ? 'Show Meetings' : 'Manage Availability'}
                </Button>

                {!viewForm ? (
                    <Box>
                        <AvailableMeetings />
                    </Box>
                ) : (
                    <Box>
                        <UserPageAvailability />
                    </Box>
                )}

            </Container>
        </React.Fragment>
    );
}
