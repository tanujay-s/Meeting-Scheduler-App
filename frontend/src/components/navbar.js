import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';  

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { auth, logout } = React.useContext(AuthContext);  

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Meeting Scheduler
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" sx={{ textAlign: 'center' }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {auth.isLoggedIn && auth.isAdmin && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin" sx={{ textAlign: 'center' }}>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
        )}
        {auth.isLoggedIn && !auth.isAdmin && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/user" sx={{ textAlign: 'center' }}>
              <ListItemText primary="User" />
            </ListItemButton>
          </ListItem>
        )}
        {auth.isLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton onClick={logout} sx={{ textAlign: 'center' }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/signin" sx={{ textAlign: 'center' }}>
              <ListItemText primary="Sign In" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Meeting Scheduler
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button component={Link} to="/" sx={{ color: '#fff' }}>
              Home
            </Button>
            {auth.isLoggedIn && auth.isAdmin && (
              <Button component={Link} to="/admin" sx={{ color: '#fff' }}>
                Admin
              </Button>
            )}
            {auth.isLoggedIn && !auth.isAdmin && (
              <Button component={Link} to="/user" sx={{ color: '#fff' }}>
                User
              </Button>
            )}
            {auth.isLoggedIn ? (
              <Button onClick={logout} sx={{ color: '#fff' }}>
                Logout
              </Button>
            ) : (
              <Button component={Link} to="/signin" sx={{ color: '#fff' }}>
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
