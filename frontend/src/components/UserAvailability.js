import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from '../api/axios';


export default function UserAvailability() {

  const [showUsersAvailability, setUsersAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSlots = async () => {
      try {
        const response = await axios.get('/meeting/users');
        setUsersAvailability(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user availability slots: ', error);
        setLoading(false);
      }
    };
    fetchUserSlots();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Box sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Availability Management
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showUsersAvailability.map((slot) => (
              <TableRow key={slot.id}>
                <TableCell>
                  <div>
                    {slot.userId.name} ({slot.userId.email})
                  </div>
                </TableCell>
                <TableCell>{new Date(slot.date).toLocaleDateString('en-GB')}</TableCell>
                <TableCell>{slot.startTime}-{slot.endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
