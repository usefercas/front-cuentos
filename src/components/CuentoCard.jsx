import React from 'react';
import { Link } from 'react-router-dom';
import './CuentoCard.css';

const CuentoCard = ({ cuento }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="cuento-card">
        <Link to={`/cuento/${cuento._id}`} className="cuento-card-link">
          <img src={cuento.image} alt={cuento.title} className="cuento-card-img" />
          <div className="cuento-card-body">
            <h3 className="cuento-card-title">{cuento.title}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CuentoCard;
