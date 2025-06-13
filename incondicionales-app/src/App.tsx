import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
// Importando CSS
import './App.css';
import './components/navbar/NavBar.css';

// Importando Componentes
import NavBar from './components/navbar/NavBar';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<h1><center>Web en Construcción</center></h1>} />
            </Routes>
        </Router>
        );
    }

export default App;
