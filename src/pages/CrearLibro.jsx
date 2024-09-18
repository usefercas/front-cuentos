import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './CrearLibro.css'; // Importa los estilos aquí

const CrearLibro = () => {
  const [title, setTitle] = useState('');
  const [contenido, setContenido] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate(); // Usa useNavigate para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, contenido, image };

    axios.post('https://api-cuento.onrender.com/api/cuentos/crear', formData)
      .then(() => {
        setStatus('Libro creado exitosamente.');
        setTitle('');
        setContenido('');
        setImage('');
        // Redirige a la página de inicio después de 1 segundo para ver el mensaje de éxito
        setTimeout(() => {
          navigate('/'); // Redirige a la página de inicio
        }, 1000); // Tiempo reducido para prueba
      })
      .catch((error) => {
        setStatus('Error al crear el libro.');
        console.error('Error creando el libro:', error);
      });
  };

  return (
    <div className="update-cuento-container">
      <h1 className="cuento-title">Crear Nuevo Libro</h1> {/* Aplica la clase cuento-title */}
      <form className="update-cuento-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Imagen (URL):</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="btn-save" type="submit">Crear Libro</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default CrearLibro;
