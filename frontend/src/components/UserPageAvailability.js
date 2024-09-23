import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from '../api/axios';


export default function AvailabilityManager() {
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ date: '', startTime: '', endTime: '' });

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get('/schedules');
                setAvailabilitySlots(response.data.availabilitySlots);
            } catch (error) {
                console.error('Error fetching slots: ', error);
            }
        };
        fetchSlots();
    }, []);

    const handleAdd = () => {
        setAvailabilitySlots([...availabilitySlots, formData]);
        setFormData({ date: '', startTime: '', endTime: '' });
    };


    const handleEdit = (index) => {
        setEditingIndex(index);
        setFormData(availabilitySlots[index]);
    };


    const handleUpdate = () => {
        const updatedSlots = [...availabilitySlots];
        updatedSlots[editingIndex] = formData;
        setAvailabilitySlots(updatedSlots);
        setFormData({ date: '', startTime: '', endTime: '' });
        setEditingIndex(null);
    };


    const handleDelete = (index) => {
        setAvailabilitySlots(availabilitySlots.filter((_, i) => i !== index));
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

            <Grid container spacing={2} sx={{ mt: 4 }}>
                {availabilitySlots.length > 0 ? (
                    availabilitySlots.map((slot, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            key={index}
                        >
                            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography>
                                    Date: {new Date(slot.date).toLocaleDateString()}, Time: {slot.startTime} - {slot.endTime}
                                </Typography>
                                <Box>
                                    <Button variant="outlined" sx={{
                                        mr: 2,
                                        fontSize: isSmallScreen ? '0.7rem' : '1rem',
                                        padding: isSmallScreen ? '4px 8px' : '6px 16px'
                                    }} onClick={() => handleEdit(index)}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error" sx={{
                                        mr: 2,
                                        fontSize: isSmallScreen ? '0.7rem' : '1rem',
                                        padding: isSmallScreen ? '4px 8px' : '6px 16px'
                                    }} onClick={() => handleDelete(index)}>
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

            {/* Form for Adding/Editing Availability */}
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
