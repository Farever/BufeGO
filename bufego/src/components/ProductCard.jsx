import React from 'react';
import { Button } from 'react-bootstrap';

const ProductCard = ({ product, handleShow }) => {
  const deleteProduct = async() => {
    console.log(JSON.stringify({id: parseInt(product.id)}))
    let response = await fetch('http://localhost:8000/termek_del', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: parseInt(product.id)})
    })
    if(!response.ok)
    {
      console.log(response);
      alert("Hiba a törlés során");
    }
    else
    {
      alert("Sikeres törlés");
    }
  }

  return (
    <div className="product-card">
      <img src={`https://res.cloudinary.com/duerxasjk/image/upload/f_auto,q_auto/${product.image}`} alt={product.name} className="product-image" />
      <div className="product-details">
        <h5 className="product-name">{product.name}</h5>
        <p className="product-info">Ár: {product.price} Ft</p>
        <p className="product-info">Állapot: {product.status}</p>
        <p className="product-info">Kategória: {product.category}</p>
        <div className="product-actions">
          <Button variant="primary" size="sm" onClick={() => {
              handleShow(product);
            }}>
            Módosítás
          </Button>
          <Button variant="danger" size="sm" onClick={() => {
              deleteProduct();
            }}>
            Törlés
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;