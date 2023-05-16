
import { Routes,Route } from 'react-router-dom';
import './App.css';
import RequerimientoContainer from './components/containers/RequerimientoContainer';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/requerimientos' element={<RequerimientoContainer/>}/>
      </Routes>
    </div>
  );
}

export default App;
