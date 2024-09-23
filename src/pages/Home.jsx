import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CuentoCard from '../components/CuentoCard';
import './Home.css';

const Home = () => {
    const [cuentos, setCuentos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://elmundodelucas.netlify.app/api/cuentos/obtener')
            .then(response => {
                setCuentos(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los cuentos:', error);
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
