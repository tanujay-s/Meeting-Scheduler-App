import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


export default function SimpleContainer() {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ textAlign:'center'}}>

                    <Box>
                        {/* Displaying current scheduled meetings */}
                        <Box sx={{ width: '100%', marginTop: 8 , marginBottom:3}}>
                        <Grid container rowSpacing={{ xs: 3, sm: 5, md: 7 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                         <Grid size={6}>
                             <Item>
                                 <Typography variant="h6">Meeting with Client A</Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Time: 10:00 AM - 11:00 AM
                                 </Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Participants: John, Alice, Bob
                                 </Typography>
                             </Item>
                         </Grid>
                         <Grid size={6}>
                             <Item>
                                 <Typography variant="h6">Meeting with Client A</Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Time: 10:00 AM - 11:00 AM
                                 </Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Participants: John, Alice, Bob
                                 </Typography>
                             </Item>
                         </Grid>
                         <Grid size={6}>
                             <Item>
                                 <Typography variant="h6">Meeting with Client A</Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Time: 10:00 AM - 11:00 AM
                                 </Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Participants: John, Alice, Bob
                                 </Typography>
                             </Item>
                         </Grid>
                         <Grid size={6}>
                             <Item>
                                 <Typography variant="h6">Meeting with Client A</Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Time: 10:00 AM - 11:00 AM
                                 </Typography>
                                 <Typography variant="body2" color="text.secondary">
                                     Participants: John, Alice, Bob
                                 </Typography>
                             </Item>
                         </Grid>
                     </Grid>
                        </Box>
                    </Box>
              
            </Container>
        </React.Fragment>
    );
}