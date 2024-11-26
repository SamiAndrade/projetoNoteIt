import React from 'react';
import Home from './home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Sobre from './pages/info';
import Cadastro from './pages/cadastro';
import Principal from './pages/main';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/info" element={<Sobre />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
