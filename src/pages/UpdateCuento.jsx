import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateCuento.css'; // Importa el CSS para el formulario de actualización

const UpdateCuento = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const [cuento, setCuento] = useState(null);
  const [editData, setEditData] = useState({ title: '', contenido: '', image: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    axios.get(`https://api-cuento.onrender.com/api/cuentos/obtener/${id}`)
      .then(response => {
        setCuento(response.data);
        setEditData(response.data); // Pre-cargar datos en el formulario
      })
      .catch(error => {
        console.error('Error fetching cuento details:', error);
        setError('Error al cargar los detalles del cuento.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = () => {
    axios.put(`https://api-cuento.onrender.com/api/cuentos/actualizar/${id}`, editData)
      .then(() => {
        navigate(`/cuento/${id}`); // Redirigir a la página de detalles después de la actualización
      })
      .catch(error => {
        console.error('Error updating cuento:', error);
        setError('Error al actualizar el cuento.');
      });
  };

  if (error) return <p>{error}</p>;
  if (!cuento) return <p>Cargando...</p>;

  return (
    <div className="update-cuento-container">
      <h1 style={{ color: '#8B4513' }}>Actualizar Cuento</h1> {/* Título en marrón */}
      <form className="update-cuento-form">
        <div>
          <label htmlFor="title" style={{ color: '#8B4513' }}>Título:</label> {/* Etiqueta en marrón */}
          <input
            type="text"
            id="title"
            name="title"
            value={editData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contenido" style={{ color: '#8B4513' }}>Contenido:</label> {/* Etiqueta en marrón */}
          <textarea
            id="contenido"
            name="contenido"
            value={editData.contenido}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image" style={{ color: '#8B4513' }}>Imagen URL:</label> {/* Etiqueta en marrón */}
          <input
            type="text"
            id="image"
            name="image"
            value={editData.image}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSaveChanges} className="btn-save">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default UpdateCuento;
