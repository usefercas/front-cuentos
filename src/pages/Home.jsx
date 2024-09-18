import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CuentoCard from '../components/CuentoCard'; // Ajusta la importación según el componente real
import './Home.css'; // Asegúrate de importar el CSS actualizado

const Home = () => {
  const [cuentos, setCuentos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cuentos/obtener') // Ajusta la URL según tu API
      .then(response => {
        setCuentos(response.data);
      })
      .catch(error => {
        console.error('Error fetching cuentos:', error);
        setError('Error al cargar los cuentos.');
      });
  }, []);

  return (
    <div className="home-container">
      <h1 className="cuentos-heading">Lista de Cuentos</h1>
      {error && <p>{error}</p>}
      <div className="cuentos-grid">
        {cuentos.map(cuento => (
          <CuentoCard key={cuento._id} cuento={cuento} />
        ))}
      </div>
    </div>
  );
};

export default Home;
