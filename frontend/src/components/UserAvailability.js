import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Mock data for user availability
const availabilityData = [
  { id: 1, user: 'John Doe', date: '2024-09-10', time: '10:00 AM - 11:00 AM' },
  { id: 2, user: 'Alice Smith', date: '2024-09-12', time: '02:00 PM - 03:00 PM' },
  { id: 3, user: 'Bob Johnson', date: '2024-09-14', time: '11:00 AM - 12:00 PM' },
];

export default function UserAvailability() {
  const handleEdit = (id) => {
    console.log(`Edit availability with ID: ${id}`);
    // Add logic to handle editing availability
  };   

  const handleDelete = (id) => {
    console.log(`Delete availability with ID: ${id}`);
    // Add logic to handle deleting availability
  };

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
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availabilityData.map((slot) => (
              <TableRow key={slot.id}>
                <TableCell>{slot.user}</TableCell>
                <TableCell>{slot.date}</TableCell>
                <TableCell>{slot.time}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(slot.id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(slot.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
