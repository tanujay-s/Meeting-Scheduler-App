import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from '../api/axios';

export default function ScheduleSession() {
  
  const [title, setTitle] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const sessionData = {
      title,
      meetingType: sessionType,
      participantsEmail: participants, 
      date,
      startTime, 
      endTime
    };

    try {
      const response = await axios.post('/meeting', sessionData); 
      console.log('Session created successfully:', response.data);
      alert(response.data.message);
      setTitle('');
      setSessionType('');
      setParticipants([]);
      setDate('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Error creating session:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);  
      } else {
        alert('An error occurred while creating the session'); 
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <h2>Schedule a New Session</h2>

      <TextField
        fullWidth
        label="Session Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="session-type-label">Session Type</InputLabel>
        <Select
          labelId="session-type-label"
          id="session-type"
          value={sessionType}
          label="Session Type"
          onChange={(e) => setSessionType(e.target.value)}
          required
        >
          <MenuItem value="One to one">One-on-One</MenuItem>
          <MenuItem value="Many">Group</MenuItem>
        </Select>
      </FormControl>
  
      <TextField
        fullWidth
        label="Participant Emails (comma-separated)"
        value={participants}
        onChange={(e) => setParticipants(e.target.value.split(','))} 
        sx={{ mb: 2 }}
        helperText="Enter multiple emails separated by commas"
        required
      />

      <TextField
        fullWidth
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Start Time"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="End Time"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
        sx={{ mb: 2 }}
      />
  
      <Button variant="contained" color="primary" type="submit">
        Schedule Session
      </Button>
    </Box>
  );
}  
