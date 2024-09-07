import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function ScheduleSession() {
  const [sessionType, setSessionType] = useState('');
  const [participants, setParticipants] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  // Handle form submission (replace with actual backend logic later)
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Session Scheduled: ${sessionType}, ${participants}, ${timeSlot}`);
    // Logic to schedule session
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <h2>Schedule a New Session</h2>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="session-type-label">Session Type</InputLabel>
        <Select
          labelId="session-type-label"
          id="session-type"
          value={sessionType}
          label="Session Type"
          onChange={(e) => setSessionType(e.target.value)}
        >
          <MenuItem value="One-on-One">One-on-One</MenuItem>
          <MenuItem value="Group">Group</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Participants"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <TextField
        fullWidth
        label="Time Slot"
        type="time"
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" type="submit">
        Schedule Session
      </Button>
    </Box>
  );
}
