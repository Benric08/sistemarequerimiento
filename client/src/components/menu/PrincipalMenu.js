import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import EditCalendar from '@mui/icons-material/EditCalendar';
import Home from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Article } from '@mui/icons-material';
const drawerWidth = 240;

const PrincipalMenu = (props) => {
  const [menuItemSelected, setMenuItemSelected] = React.useState('Inicio');
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation(); // esto permitirá verificar la ruta actual
  const isLoginPage = location.pathname === '/login'; // evalúa si es la ruta de login
  const isEstadosPage = location.pathname === '/procompite';

  // si la ruta actual es de login, retornamos null para evitar que se muestre la barra de navegación
  if (isLoginPage || isEstadosPage) {
    return null;
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const drawer = (
    <div>
      <Toolbar sx={{
        backgroundColor: '#1976d2',
      }}><Typography variant={'h5'} align='center' sx={{ fontFamily: 'monospace', letterSpacing: '.3rem', fontWeight: '700', color: 'white' }}>PROCOMPITE KIMBIRI</Typography></Toolbar>
      <Divider />

      <List>
        <ListItem disablePadding  >
          <ListItemButton component={NavLink} to="/" style={({ isActive, isPending }) => {
            return {
              backgroundColor: isActive ? "e0e0e0" : "",
              color: isPending ? "green" : "black",
            };
          }}>
            <ListItemIcon>
              <Home color='primary' />
            </ListItemIcon>
            <ListItemText primary="Inicio" sx={{ color: 'black' }} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding  >
          <ListItemButton component={NavLink} to="/requerimientos" style={({ isActive, isPending }) => {
            return {
              backgroundColor: isActive ? "e0e0e0" : "",
              color: isPending ? "green" : "black",
            };
          }}>
            <ListItemIcon>
              <EditCalendar color='primary' />
            </ListItemIcon>

            <ListItemText primary="Requerimientos" sx={{ color: 'black' }} />

          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding   >
          <ListItemButton component={NavLink} to="/proveedores" style={({ isActive, isPending }) => {
            return {
              backgroundColor: isActive ? "e0e0e0" : "",
              color: isPending ? "green" : "black",
            };
          }}>
            <ListItemIcon>
              <AssignmentInd color='primary' />
            </ListItemIcon>

            <ListItemText primary="Proveedores" sx={{ color: 'black' }} />

          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding  >
          <ListItemButton component={NavLink} to="/documentospdf" style={({ isActive, isPending }) => {
            return {
              backgroundColor: isActive ? "e0e0e0" : "",
              color: isPending ? "green" : "black",
            };
          }} >
            <ListItemIcon>
              <Article color='primary' />
            </ListItemIcon>

            <ListItemText primary="Documentos" sx={{ color: 'black' }} />

          </ListItemButton>
        </ListItem>
      </List>

    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          
        }}
      >
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
          <Typography variant="h6" noWrap component="div">
            {menuItemSelected}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

    </>
  );
}

export default PrincipalMenu;
