
import { Routes,Route } from 'react-router-dom';
import './App.css';
import AddEntregable from './components/forms/AddEntregable';
import RequerimientoContainerMU from './components/containers/RequerimientoContainerMU';
import AddOrdenServicio from './components/forms/AddOrdenServicio';
import ProveedorContainer from './components/containers/ProveedorContainer';
import PrincipalMenu from './components/menu/PrincipalMenu';
function App() {
  return (
    <div className="App" style={{display:'flex'}}>
      <PrincipalMenu/>
      <Routes>
        <Route path='/requerimientos' element={<RequerimientoContainerMU/>}/>
        <Route path='/entregable' element={<AddEntregable/>}/>
        <Route path='/ordenservicio' element={<AddOrdenServicio/>}/>
        <Route path='/proveedores' element={<ProveedorContainer/>}/>
      </Routes>
    </div>
  );
}

export default App;
