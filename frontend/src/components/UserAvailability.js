import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from '../api/axios';


export default function UserAvailability() {

  const [showUsersAvailability, setUsersAvailability] = useState([]);

  useEffect(()=>{
    const fetchUserSlots = async ()=>{
      try{
          const response = await axios.get('/meeting/users');
          setUsersAvailability(response.data);
      } catch (error) {
          console.error('Error fetching user availability slots: ', error);
      }
    };
     fetchUserSlots();
  },[]);
  

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
            {showUsersAvailability.map((slot)=>(
              <TableRow key={slot.id}>
                <TableCell>{slot.userId.name}
                  <TableRow>{slot.userId.email}</TableRow>
                </TableCell>
                <TableCell>{new Date(slot.date).toLocaleDateString()}</TableCell>
                <TableCell>{slot.startTime}-{slot.endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
