import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CuentoDetails.css';

const CuentoDetails = () => {
    const { id } = useParams();
    const [cuento, setCuento] = useState(null);
    const [error, setError] = useState(null);
    const [isReading, setIsReading] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://elmundodelucas.netlify.app/api/cuentos/obtener/${id}`)
            .then(response => {
                setCuento(response.data);
            })
            .catch(error => {
                console.error('Error al recuperar los detalles del cuento:', error);
                setError('Error al cargar los detalles del cuento.');
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://elmundodelucas.netlify.app/api/cuentos/eliminar/${id}`)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error al eliminar el cuento:', error);
                setError('Error al eliminar el cuento.');
            });
    };

    const readText = () => {
        if ('speechSynthesis' in window) {
            if (isReading) {
                setIsReading(false);
                speechSynthesis.cancel();
            } else {
                const newUtterance = new SpeechSynthesisUtterance(cuento.contenido);
                setUtterance(newUtterance);
                setIsReading(true);
                speechSynthesis.speak(newUtterance);
            }
        } else {
            alert('La síntesis de voz no está soportada en este navegador.');
        }
    };

    if (error) return <p>{error}</p>;
    if (!cuento) return <p>Cargando...</p>;

    return (
        <div className="cuento-details-container">
            <h1 className="cuento-details-title">{cuento.title}</h1>
            <img src={cuento.image} alt={cuento.title} className="cuento-details-img" />
            <button className="cuento-details-read-button" onClick={readText}>
                {isReading ? 'Detener Lectura' : 'Leer Contenido'}
            </button>
            <p className="cuento-details-content">{cuento.contenido}</p>
            <div className="cuento-details-buttons">
                <button className="cuento-details-back-button" onClick={() => navigate(-1)}>Volver atrás</button>
                <button className="cuento-details-delete-button" onClick={handleDelete}>Eliminar</button>
                <button className="boton-actualizacion-detalles-cuento" onClick={() => navigate(`/cuentos/update/${id}`)}>Actualizar</button>
            </div>
        </div>
    );
};

export default CuentoDetails;
