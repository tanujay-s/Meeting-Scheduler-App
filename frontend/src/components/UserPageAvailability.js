import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from '../api/axios';


export default function AvailabilityManager() {
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ date: '', startTime: '', endTime: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get('/schedules');
                setAvailabilitySlots(response.data.availabilitySlots);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching slots: ', error);
                setLoading(false);
            }
        };
        fetchSlots();
    }, []);

    const handleAdd = () => {
        const addSlot = async () => {
            try {
                const response = await axios.post('/schedules', formData);
                setAvailabilitySlots([...availabilitySlots, formData]);
                setFormData({ date: '', startTime: '', endTime: '' });
                alert(response.data.message);
            } catch (error) {
                console.error('Error adding availability slot: ', error);
                alert('Failed to add new slot');
            }
        }
        addSlot();
    };

    const handleEdit = (id) => {
        const slotToEdit = availabilitySlots.find(slot => slot._id === id);
        if (slotToEdit) {
            const formattedDate = new Date(slotToEdit.date).toISOString().split('T')[0];

            setFormData({
                ...slotToEdit,
                date: formattedDate
            });
            setEditingIndex(id);

        } else {
            console.error('Slot not found');
        }
    };


    const handleUpdate = () => {
        const editSlot = async () => {
            try {
                const response = await axios.put(`/schedules/${editingIndex}`, formData);
                alert(response.data.message);
                const updatedSlots = availabilitySlots.map(slot =>
                    slot._id === editingIndex ? { ...slot, ...formData } : slot
                );

                setAvailabilitySlots(updatedSlots);
                setFormData({ date: '', startTime: '', endTime: '' });
                setEditingIndex(null);

            } catch (error) {
                console.error('Error updating slot: ', error);
                alert('Failed to update slot');
            }
        };
        editSlot();
    };


    const handleDelete = (id) => {
        const slotToDelete = availabilitySlots.find(slot => slot._id === id);
    
        if (slotToDelete) {
            const deleteSlot = async () => {
                try {
                    const response = await axios.delete(`/schedules/${id}`);                    
                    alert(response.data.message);
                    setAvailabilitySlots(prevSlots => prevSlots.filter(slot => slot._id !== id));
                    
                } catch (error) {
                    console.error('Error deleting slot: ', error);
                    alert('Failed to delete slot');
                }
            };
    
            deleteSlot();
        } else {
            console.error('Slot not found:', id);
        }
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

            <Grid container spacing={2} sx={{ mt: 4 }}>
                {availabilitySlots.length > 0 ? (
                    availabilitySlots.map((slot) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            key={slot._id}
                        >
                            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography>
                                    Date: {new Date(slot.date).toLocaleDateString('en-GB')}, Time: {slot.startTime} - {slot.endTime}
                                </Typography>
                                <Box>
                                    <Button variant="outlined" sx={{
                                        mr: 2,
                                        fontSize: isSmallScreen ? '0.7rem' : '1rem',
                                        padding: isSmallScreen ? '4px 8px' : '6px 16px'
                                    }} onClick={() => handleEdit(slot._id)}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error" sx={{
                                        mr: 2,
                                        fontSize: isSmallScreen ? '0.7rem' : '1rem',
                                        padding: isSmallScreen ? '4px 8px' : '6px 16px'
                                    }} onClick={() => handleDelete(slot._id)}>
                                        Delete
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No slots created
                    </Typography>
                )}
            </Grid>

            <Typography variant="h4" sx={{ marginTop: 2 }}>ADD NEW SLOTS</Typography>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                <TextField
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Start Time"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="End Time"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                />
                <Button
                    variant="contained"
                    onClick={editingIndex === null ? handleAdd : handleUpdate}
                >
                    {editingIndex === null ? 'Add Availability' : 'Update Availability'}
                </Button>
            </Box>

        </Box>
    );
}
