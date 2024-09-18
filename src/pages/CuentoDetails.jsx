import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CuentoDetails.css'; // Importa el archivo de estilos

const CuentoDetails = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const [cuento, setCuento] = useState(null);
  const [error, setError] = useState(null);
  const [isReading, setIsReading] = useState(false); // Estado para controlar la lectura
  const [utterance, setUtterance] = useState(null); // Estado para almacenar la utterance actual
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    axios.get(`http://localhost:3000/api/cuentos/obtener/${id}`)
      .then(response => {
        setCuento(response.data);
      })
      .catch(error => {
        console.error('Error fetching cuento details:', error);
        setError('Error al cargar los detalles del cuento.');
      });
  }, [id]);

  useEffect(() => {
    if (isReading && utterance) {
      speechSynthesis.speak(utterance);
    } else if (!isReading && utterance) {
      speechSynthesis.cancel(); // Detener la lectura si se cancela
    }
  }, [isReading, utterance]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/cuentos/eliminar/${id}`)
      .then(() => {
        navigate('/'); // Redirigir a la página principal después de eliminar
      })
      .catch(error => {
        console.error('Error deleting cuento:', error);
        setError('Error al eliminar el cuento.');
      });
  };

  const readText = () => {
    if ('speechSynthesis' in window) {
      if (isReading) {
        setIsReading(false); // Detener la lectura
      } else {
        const newUtterance = new SpeechSynthesisUtterance(cuento.contenido);
        setUtterance(newUtterance);
        setIsReading(true); // Iniciar la lectura
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
      <img
        src={cuento.image}
        alt={cuento.title}
        className="cuento-details-img"
      />
      <button
        className="cuento-details-read-button"
        onClick={readText} // Leer o detener el contenido en voz alta
      >
        {isReading ? 'Detener Lectura' : 'Leer Contenido'}
      </button>
      <p className="cuento-details-content">{cuento.contenido}</p>
      <div className="cuento-details-buttons">
        <button
          className="cuento-details-back-button"
          onClick={() => navigate(-1)} // Volver a la página anterior
        >
          Volver atrás
        </button>
        <button
          className="cuento-details-delete-button"
          onClick={handleDelete} // Eliminar el cuento
        >
          Eliminar
        </button>
        <button
          className="cuento-details-update-button"
          onClick={() => navigate(`/cuentos/update/${id}`)} // Ir a la página de actualización
        >
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default CuentoDetails;
