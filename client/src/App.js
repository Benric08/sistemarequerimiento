
import { Routes,Route } from 'react-router-dom';
import './App.css';
import RequerimientoContainer from './components/containers/RequerimientoContainer';
import RequerimientoContainerMU from './components/containers/RequerimientoContainerMU';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/requerimientos' element={<RequerimientoContainer/>}/>
        <Route path='/requerimientoss' element={<RequerimientoContainerMU/>}/>
      </Routes>
    </div>
  );
}

export default App;
