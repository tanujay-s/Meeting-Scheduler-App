import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from '../api/axios';

export default function AdminManageSessions() {

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setnewDate] = useState('');
  const [newStartTime, setnewStartTime] = useState('');
  const [newEndTime, setnewEndTime] = useState('');

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

  const handleReschedule = (id) => {
    setRescheduleId(id);
  };

  const submitReschedule = () => {
    const updateData = async () => {
      try {
        const formData = {
          date: newDate,
          startTime: newStartTime,
          endTime: newEndTime
        };
        const response = await axios.put(`/meeting/${rescheduleId}`, formData);
        alert(response.data.message);
        const updatedSessions = sessions.map(session =>
          session._id === rescheduleId
            ? {
              ...session,
              date: formData.date,
              timeSlot: {
                startTime: formData.startTime,
                endTime: formData.endTime
              }
            }
            : session
        );
        setSessions(updatedSessions);
        setRescheduleId(null);
      } catch (error) {
        console.error('Error rescheduling meeting: ', error);
        alert(error.message);
      }
    }
    updateData();
  };

  const handleCancel = (id) => {
    const deleteSession = async () =>{
        try{
          const response =  await axios.delete(`/meeting/${id}`);
          alert(response.data.message);
          setSessions(sessions.filter((session) => session._id !== id));
        } catch(error) {
          console.error('Error canceling session: ', error);
          alert('Failed to cancel session');
        }
    }
      deleteSession();
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
                <TableRow key={session._id}>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>{new Date(session.date).toLocaleDateString('en-GB')}</TableCell>
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
                      onClick={() => handleReschedule(session._id)}
                      sx={{ mr: 2 }}
                    >
                      Reschedule
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancel(session._id)}
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
            label="Date"
            type="date"
            value={newDate}
            onChange={(e) => setnewDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Start Time"
            type="time"
            value={newStartTime}
            onChange={(e) => setnewStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="End Time"
            type="time"
            value={newEndTime}
            onChange={(e) => setnewEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
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
