import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, TextField } from '@mui/material';

export default function AdminManageSessions() {
  // Dummy data for scheduled sessions
  const [sessions, setSessions] = useState([
    { id: 1, title: 'Session 1', time: '10:00 AM - 11:00 AM' },
    { id: 2, title: 'Session 2', time: '12:00 PM - 1:00 PM' },
    { id: 3, title: 'Session 3', time: '2:00 PM - 3:00 PM' },
  ]);

  const [rescheduleId, setRescheduleId] = useState(null); // Tracks session to reschedule
  const [newTime, setNewTime] = useState(''); // New time for rescheduling

  // Handle reschedule
  const handleReschedule = (id) => {
    setRescheduleId(id);
  };

  // Submit reschedule changes
  const submitReschedule = () => {
    const updatedSessions = sessions.map((session) =>
      session.id === rescheduleId ? { ...session, time: newTime } : session
    );
    setSessions(updatedSessions);
    setRescheduleId(null); // Close reschedule form
    setNewTime(''); // Reset time field
  };

  // Handle cancel
  const handleCancel = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  return (
    <Box sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Manage Sessions
      </Typography>

      {/* Displaying current sessions */}
      <List>
        {sessions.map((session) => (
          <ListItem key={session.id}>
            <ListItemText
              primary={session.title}
              secondary={`Time: ${session.time}`}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleReschedule(session.id)}
              sx={{ mr: 2 }}
            >
              Reschedule
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleCancel(session.id)}
            >
              Cancel
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Reschedule Form */}
      {rescheduleId && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Reschedule Session</Typography>
          <TextField
            label="New Time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={submitReschedule}
          >
            Submit Reschedule
          </Button>
        </Box>
      )}
    </Box>
  );
}
