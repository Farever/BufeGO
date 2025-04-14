import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Alert } from "react-bootstrap";
import ActionButton from "./ActionButton";
import axios from 'axios';
import '../styles/Stats.css'; // itt van a design

const ProductCard = ({ product, handleShow = null, forStat = false }) => {
  const [deleteShow, setDeleteShow] = useState(false);
  const [deletestatus, setDeleteStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const deleteClose = () => { setDeleteShow(false) };
  const deleteOpen = () => { setDeleteShow(true); };
  const [product_category, setproduct_category] = useState([]);

  const deleteProduct = async () => {
    const response = await fetch('http://localhost:8000/termek_del', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: parseInt(product.id) })
    });
    if (!response.ok) {
      console.log(response);
      setDeleteStatus("success");
      setResponseMessage("Hiba a törlés során")
    }
    else {
      setDeleteStatus("success");
      setResponseMessage("Sikeres törlés")
    }
  };

  const getKategoria = async () => {
    const response = await axios.get(`http://localhost:8000/kategorianev?id=${product.category_id}`);
    const data = response.data.valasz[0].categroy_name;
    setproduct_category(data);
  };

  useEffect(() => {
    getKategoria();
  }, [product]);

  return (
    <Card className={`product-card ${forStat ? "stat-mode" : ""}`}>
      <Card.Img
        variant="top"
        src={`https://res.cloudinary.com/duerxasjk/image/upload/c_fill,f_auto,q_auto/${product.image}`}
        alt={product.name}
        className="product-image"
      />
      <Card.Body className="product-details text-center">
        <Card.Title className="product-name">{product.name}</Card.Title>
        <Card.Text className="product-info">Ár: {product.price} Ft</Card.Text>
        <Card.Text className="product-info">
          Állapot: {product.is_avaliable == 1 ? "Elérhető" : "Nem elérhető"}
        </Card.Text>
        <Card.Text className="product-info">Kategória: {product_category}</Card.Text>

        {!forStat && (
          <div className="product-actions d-flex justify-content-center gap-2 mt-3">
            <Button variant="outline-primary" size="sm" onClick={() => handleShow(product)}>
              Módosítás
            </Button>
            <Button variant="outline-danger" size="sm" onClick={deleteOpen}>
              Törlés
            </Button>

            <Modal show={deleteShow} onHide={deleteClose}>
              <Modal.Header closeButton>
                <Modal.Title>Biztosan törölni szeretné?</Modal.Title>
              </Modal.Header>
              {responseMessage && <Alert variant={deletestatus}>{responseMessage}</Alert>}
            <Modal.Body className="text-center">
                <ActionButton type="cancel" onClick={deleteClose} />
                <ActionButton type="ok" onClick={deleteProduct} />
              </Modal.Body>
            </Modal>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
