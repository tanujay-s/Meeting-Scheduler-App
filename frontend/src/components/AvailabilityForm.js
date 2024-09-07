import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AvailabilityForm({onSubmit, onCancel }) {
    onSubmit = (event) => {
        event.preventDefault(); 
        
        onCancel(); 
    };

    return (
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Enter Your Availability
            </Typography>
            <TextField
                label="Date"
                type="date"
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Start Time"
                type="time"
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="End Time"
                type="time"
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Submit
                </Button>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}
