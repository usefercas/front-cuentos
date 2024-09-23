import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateCuento.css';

const UpdateCuento = () => {
    const { id } = useParams();
    const [cuento, setCuento] = useState(null);
    const [editData, setEditData] = useState({ title: '', contenido: '', image: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://elmundodelucas.netlify.app/api/cuentos/obtener/${id}`)
            .then(response => {
                setCuento(response.data);
                setEditData(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los detalles del cuento:', error);
                setError('Error al cargar los detalles del cuento.');
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSaveChanges = () => {
        axios.put(`https://elmundodelucas.netlify.app/api/cuentos/actualizar/${id}`, editData)
            .then(() => {
                navigate(`/cuento/${id}`);
            })
            .catch(error => {
                console.error('Error al actualizar el cuento:', error);
                setError('Error al actualizar el cuento.');
            });
    };

    if (error) return <p>{error}</p>;
    if (!cuento) return <p>Cargando...</p>;

    return (
        <div className="update-cuento-container">
            <h1 style={{ color: '#8B4513' }}>Actualizar Cuento</h1>
            <form className="update-cuento-form">
                <div>
                    <label htmlFor="title" style={{ color: '#8B4513' }}>Título:</label>
                    <input type="text" id="title" name="title" value={editData.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="contenido" style={{ color: '#8B4513' }}>Contenido:</label>
                    <textarea id="contenido" name="contenido" value={editData.contenido} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="image" style={{ color: '#8B4513' }}>URL de la imagen:</label>
                    <input type="text" id="image" name="image" value={editData.image} onChange={handleChange} />
                </div>
                <button type="button" onClick={handleSaveChanges} className="btn-save">Guardar cambios</button>
            </form>
        </div>
    );
};

export default UpdateCuento;
