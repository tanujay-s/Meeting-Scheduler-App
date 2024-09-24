import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper,CircularProgress, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

export default function AdminManageSessions() {

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleId, setRescheduleId] = useState(null); 
  const [newTime, setNewTime] = useState(''); 

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('/meeting');
        setSessions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scheduled sessions: ', error);
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage scheduled sessions
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell>Reschedule session</TableCell>
                <TableCell>Cancel Session</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                  <TableCell>{session.timeSlot.startTime}-{session.timeSlot.endTime}</TableCell>
                  <TableCell>
                    {
                      session.participants.map((participant, index) => (
                        <div key={index}>
                          {participant.name}({participant.email})
                        </div>
                      ))
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleReschedule(session.id)}
                      sx={{ mr: 2 }}
                    >
                      Reschedule
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancel(session.id)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
