import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Importando CSS
import './App.css';
import './components/NavBar/NavBar.css';
import './pages/Miembros/Miembros.css';
import './pages/Partidos/Partidos.css';
import './pages/Acceso/Acceso.css';

// Importando Paginas
import Miembros from './pages/Miembros/Miembros';
import Partidos from './pages/Partidos/Partidos';
import Acceso from './pages/Acceso/Acceso';

// Importando Componentes
import NavBar from './components/NavBar/NavBar';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<h1><center>Web en Construcción</center></h1>} />
                <Route path="/Miembros" element={<Miembros />} />
                <Route path="/Partidos" element={<Partidos />} />
                <Route path="/Acceso" element={<Acceso />} />
            </Routes>
        </Router>
    );
}

export default App;
