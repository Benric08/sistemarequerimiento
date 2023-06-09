
import { Routes,Route } from 'react-router-dom';
import './App.css';
import AddEntregable from './components/forms/AddEntregable';
import RequerimientoContainerMU from './components/containers/RequerimientoContainerMU';
import AddOrdenServicio from './components/forms/AddOrdenServicio';
import ProveedorContainer from './components/containers/ProveedorContainer';
import PrincipalMenu from './components/menu/PrincipalMenu';
import Fileview from './components/forms/Fileview';
import { Callendar } from './components/containers/Callendar';
import { Box } from '@mui/material';
import axios from 'axios';
axios.defaults.baseURL="https://sistemarequerimiento-production.up.railway.app/"
//axios.defaults.baseURL="http://localhost:3001/"

function App() {
  return (
    <div className="App" >
      <PrincipalMenu/>
      <Box sx={{padding:'3%'}}>
        <Routes>
          <Route path='/' element={<Callendar/>}/>
          <Route path='/requerimientos' element={<RequerimientoContainerMU/>}/>
          <Route path='/entregable' element={<AddEntregable/>}/>
          <Route path='/ordenservicio' element={<AddOrdenServicio/>}/>
          <Route path='/proveedores' element={<ProveedorContainer/>}/>
          <Route path='/testfile' element={<Fileview/>}/>
        </Routes>
      </Box>
    </div>
  );
}

export default App;
