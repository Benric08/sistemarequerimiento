
import { Routes,Route } from 'react-router-dom';
import './App.css';
import AddEntregable from './components/forms/AddEntregable';
import RequerimientoContainerMU from './components/containers/RequerimientoContainerMU';
import AddOrdenServicio from './components/forms/AddOrdenServicio';
import ProveedorContainer from './components/containers/ProveedorContainer';
import PrincipalMenu from './components/menu/PrincipalMenu';
import { Call } from '@mui/icons-material';
import { Callendar } from './components/containers/Callendar';
function App() {
  return (
    <div className="App" >
      <PrincipalMenu/>
      <Routes>

        <Route path='/' element={<Callendar/>}/>
        <Route path='/requerimientos' element={<RequerimientoContainerMU/>}/>
        <Route path='/entregable' element={<AddEntregable/>}/>
        <Route path='/ordenservicio' element={<AddOrdenServicio/>}/>
        <Route path='/proveedores' element={<ProveedorContainer/>}/>
      </Routes>
    </div>
  );
}

export default App;
