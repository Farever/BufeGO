import React from 'react';
import { Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h5 className="product-name">{product.name}</h5>
        <p className="product-info">Ár: {product.price} Ft</p>
        <p className="product-info">Állapot: {product.status}</p>
        <p className="product-info">Kategória: {product.category}</p>
        <div className="product-actions">
          <Button variant="primary" size="sm">
            Módosítás
          </Button>
          <Button variant="danger" size="sm">
            <i className="fas fa-trash-alt"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;