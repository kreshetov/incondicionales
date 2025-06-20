import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando CSS
import './App.css';
import './components/NavBar/NavBar.css';
import './pages/Miembros/Miembros.css';
import './pages/Acceso/Acceso.css';

// Importando Paginas
import Acceso from './pages/Acceso/Acceso';
import Miembros from './pages/Miembros/Miembros';

// Importando Componentes
import NavBar from './components/NavBar/NavBar';

function App() {

    return (
        <Router basename="/">
            <NavBar />
            <Routes>
                <Route path="/" element={<h1><center>Web en Construcción</center></h1>} />
                <Route path="/Miembros" element={<Miembros />} />
                <Route path="/Acceso" element={<Acceso />} />
            </Routes>
        </Router>
        );
    }

export default App;
