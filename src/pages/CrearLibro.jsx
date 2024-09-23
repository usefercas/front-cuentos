import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CrearLibro.css';

const CrearLibro = () => {
    const [title, setTitle] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImage] = useState('');
    const [estado, setStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { title, contenido, imagen };
        
        axios.post('https://elmundodelucas.netlify.app/api/cuentos/crear', formData)
            .then(() => {
                setStatus('Libro creado exitosamente.');
                setTitle('');
                setContenido('');
                setImage('');
                setTimeout(() => navigate('/'), 1000);
            })
            .catch(error => {
                setStatus('Error al crear el libro.');
                console.error('Error al crear el libro:', error);
            });
    };

    return (
        <div className="crear-libro-container">
            <h1 className="crear-libro-title">Crear Nuevo Libro</h1>
            <form className="crear-libro-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="contenido">Contenido:</label>
                    <textarea id="contenido" value={contenido} onChange={(e) => setContenido(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="image">Imagen (URL):</label>
                    <input type="text" id="image" value={imagen} onChange={(e) => setImage(e.target.value)} />
                </div>
                <button type="submit" className="btn-save">Crear libro</button>
            </form>
            {estado && <p>{estado}</p>}
        </div>
    );
};

export default CrearLibro;
