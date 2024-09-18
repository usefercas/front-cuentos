import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CrearLibro from './pages/CrearLibro'; 
import CuentoDetails from './pages/CuentoDetails';
import NavBar from './components/NavBar';
import UpdateCuento from './pages/UpdateCuento';
import './App.css'; 

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CrearLibro />} />
        <Route path="/cuento/:id" element={<CuentoDetails />} /> {/* Ruta corregida */}
        <Route path="/cuentos/update/:id" element={<UpdateCuento />} />
      </Routes>
    </>
  );
};

export default App;
