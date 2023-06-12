import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import EditCalendar from '@mui/icons-material/EditCalendar';
import Home from '@mui/icons-material/Home';
import {NavLink, useLocation} from 'react-router-dom'
import { Divider } from '@mui/material';

export default function PrincipalMenu() {
  const location = useLocation(); // esto permitirá verificar la ruta actual
  const isLoginPage = location.pathname === '/login'; // evalúa si es la ruta de login

  // si la ruta actual es de login, retornamos null para evitar que se muestre la barra de navegación
  if (isLoginPage) {
    return null;
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 300,backgroundColor: 'primary.light' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <NavLink to='/' style={{textDecoration: 'none' }}><ListItemText primary="Inicio" sx={{color:'white'}}/></NavLink>
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
                <EditCalendar />
              </ListItemIcon>
              <NavLink to='/requerimientos' style={{textDecoration: 'none' }}><ListItemText primary="Requerimientos" sx={{color:'white'}}/></NavLink>
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
                <AssignmentInd />
              </ListItemIcon>
              <NavLink to='proveedores' style={{textDecoration: 'none' }}><ListItemText primary="Proveedores" sx={{color:'white'}}/></NavLink>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      
    </Box>
  );
}
