import React from 'react';
import Calendar from 'react-calendar';
import { Box, Typography, Paper, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
    const [value, onChange] = React.useState(new Date());

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ textAlign: 'center', marginTop: 5, flexGrow: 1 }}>
            <Grid 
                container 
                spacing={2} 
                justifyContent="center" 
                alignItems="center"
                sx={{ height: '80vh' }}  
            >
                
                <Grid item xs={12} md={4}>
                    <Item>
                        <Typography variant="h3" component="h1" gutterBottom>
                            Welcome to the Meeting Scheduler
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Here you can manage your availability and view upcoming meetings. Please proceed to the User Page to manage your schedules.
                        </Typography>
                    </Item>
                </Grid>

           
                <Grid item xs={12} md={4}>
                    <Item>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Calendar
                                onChange={onChange}
                                value={value}
                                
                                sx={{ width: 'auto', height: 'auto' }} 
                            />
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}







// import React from 'react';
// import Calendar from 'react-calendar';
// import { Box, Typography, Paper, styled } from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import 'react-calendar/dist/Calendar.css';

// export default function Home() {
//     const [value, onChange] = React.useState(new Date());

//     const Item = styled(Paper)(({ theme }) => ({
//         backgroundColor: '#fff',
//         ...theme.typography.body2,
//         padding: theme.spacing(1),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#1A2027',
//         }),
//     }));

//     return (
//         <Box sx={{ textAlign: 'center', marginTop: 5, flexGrow: 1 }}>

//             <Grid container spacing={2}>
//                 <Grid size={4}>
//                     <Item><Typography variant="h3" component="h1" gutterBottom>
//                         Welcome to the Scheduling Platform
//                     </Typography>
//                         <Typography variant="body1" component="p" gutterBottom>
//                             Here you can manage your availability and view upcoming meetings. Please proceed to the User Page to manage your schedules.
//                         </Typography></Item>
//                 </Grid>
//                 <Grid size={4}>
//                     <Item><Calendar onChange={onChange} value={value} /></Item>
//                 </Grid>
//             </Grid>

//         </Box>
//     );
// }
