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
    const [voices, setVoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cambié la URL de Netlify a tu servidor local
        axios.get(`http://localhost:3000/api/cuentos/obtener/${id}`)
            .then(response => {
                setCuento(response.data);
            })
            .catch(error => {
                console.error('Error al recuperar los detalles del cuento:', error);
                setError('Error al cargar los detalles del cuento.');
            });

        // Obtener las voces disponibles
        const synth = window.speechSynthesis;
        const voiceList = synth.getVoices();
        setVoices(voiceList);
    }, [id]);

    const handleDelete = () => {
        // Cambié la URL de Netlify a tu servidor local
        axios.delete(`http://localhost:3000/api/cuentos/eliminar/${id}`)
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

                // Mostrar las voces disponibles para probar cuál suena más natural
                console.log('Voces disponibles:');
                voices.forEach(voice => {
                    console.log(voice.name, voice.lang);
                });

                // Seleccionar una voz natural de la lista de voces
                const selectedVoice = voices.find(voice => voice.lang === 'es-ES'); // Puedes cambiar este filtro si deseas otra voz

                // Si se encuentra una voz adecuada, usarla
                if (selectedVoice) {
                    newUtterance.voice = selectedVoice;
                }

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
                {isReading ? 'Detener Lectura' : 'Escuchar Cuento'}
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
