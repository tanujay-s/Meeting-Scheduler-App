import React, { useState } from 'react';
import  {Box} from '@mui/material';
import SimpleContainer from './SimpleContainer';


export default function UserPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Box sx={{ marginTop: 5 }}>
      <SimpleContainer showForm={showForm} setShowForm={setShowForm} />
    </Box>
  );
}
