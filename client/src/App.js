
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AddEntregable from './components/forms/AddEntregable';
import RequerimientoContainerMU from './components/containers/RequerimientoContainerMU';
import AddOrdenServicio from './components/forms/AddOrdenServicio';
import ProveedorContainer from './components/containers/ProveedorContainer';
import PrincipalMenu from './components/menu/PrincipalMenu';
import Fileview from './components/forms/Fileview';
import { Callendar } from './components/containers/Callendar';
import { Box, Toolbar } from '@mui/material';
import axios from 'axios';
import Login from './components/forms/Login';
import { RequireAuth } from 'react-auth-kit';
//import CircularLoader from './components/loaders/CircularLoader';
import Estados from './estados/Estados';
import PdfContainer from './components/containers/PdfContainer';
axios.defaults.baseURL="https://sistemarequerimiento-production.up.railway.app/"
//axios.defaults.baseURL = "http://localhost:3001/"

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <PrincipalMenu />
      <Box sx={{ padding: '3%', width: '100%' }} >
        <Toolbar />
        <Routes>
          <Route path='/' element={<RequireAuth loginPath={'/login'}><Callendar /></RequireAuth>} />
          <Route path='/requerimientos' element={<RequireAuth loginPath={'/login'}><RequerimientoContainerMU /></RequireAuth>} />
          <Route path='/entregable' element={<AddEntregable />} />
          <Route path='/ordenservicio' element={<AddOrdenServicio />} />
          <Route path='/proveedores' element={<RequireAuth loginPath={'/login'}><ProveedorContainer /></RequireAuth>} />
          <Route path='/testfile' element={<Fileview />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/loader' element={<CircularLoader/>}/> */}
          <Route path='/procompite' element={<Estados />} />
          <Route path='/documentospdf' element={<PdfContainer />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
