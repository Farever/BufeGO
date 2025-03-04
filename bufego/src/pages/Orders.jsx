import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import OrderBadge from '../components/OrderBadge';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = 1; // Példa felhasználói ID - cseréld le a tényleges felhasználói azonosítóra

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/sajatrendelesek`,
          { params: { "userId": userId } },
        );
        setOrders(response.data.valasz.rendelesek);
      } catch (error) {
        console.error("Hiba a rendelések lekérésekor:", error);
      }
    };

    fetchOrders();
  }, [userId]); // Újra lekérjük a rendeléseket, ha a userId megváltozik

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <Container>
      <h2>Rendeléseim</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => {
          console.log(order);
          return (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{order.place[0].name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Rendelve: {order.orderd_at}
                </Card.Subtitle>
                <Card.Text><OrderBadge status={order.status*1}/></Card.Text>
                <Button variant="primary" onClick={() => handleShowDetails(order)}>
                  Részletek
                </Button>
              </Card.Body>
            </Card>
          )
        })
      ) : (
        <p>Nincsenek rendeléseid.</p>
      )}

      {/* Modal a rendelés részleteihez */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rendelés részletei</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>Étterem: {selectedOrder.place[0].name}</p>
              <p><OrderBadge status={selectedOrder.status*1}/></p>
              <p>Rendelve: {selectedOrder.orderd_at}</p>
              <h4>Termékek:</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Név</th>
                    <th>Ár(Ft)</th>
                    <th>Mennyiség</th>
                    <th>Kép</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Bezár
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OrdersPage;