import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import OrderBadge from '../components/OrderBadge';
import '../styles/myorders.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../Contexts';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {userData} = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/sajatrendelesek`, {
          params: { "userId": userData.user_id },
        });
    
        const orders = response.data?.valasz?.rendelesek;
    
        if (Array.isArray(orders)) {
          setOrders(orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Hiba a rendelések lekérésekor:", error);
        setOrders([]);
      }
    };
    

    fetchOrders();
  }, [userData.user_id]);

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleShowRatingModal = () => {
    setShowModal(false);
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
    setRating(0);
    setComment("");
    setSelectedOrder(null);
    handleCloseModal();
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.post('http://localhost:8000/bufe_rendelesstatusz', {
        rendeles_id: orderId,
        status: newStatus,
      });
      location.reload();
    } catch (error) {
      console.error('Hiba a rendelés státuszának frissítésekor:', error);
    }
  };

  const handleSubmitRating = async () => {
    if(rating == 0){
      alert("Az értékelés megadása kötelező!");
      return;
    }
    try {
      let resp = await axios.post('http://localhost:8000/rating', {
        "user_id": selectedOrder.user_id,
        "place_id": selectedOrder.place_id,
        "order_id" : selectedOrder.id,
        "rating": rating,
        "comment": comment
      });

      if(resp.status == 200){
        alert("Sikeres értékelés!");
        handleStatusChange(selectedOrder.id, 5);
      }

      handleCloseRatingModal();
    } catch (error) {
      console.error("Hiba az értékelés beküldésekor:", error);
    }
  };

  return (
    <Container>
      <h2>Rendeléseim</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => {
          return (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{order.place[0].name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Rendelve: {order.orderd_at}
                </Card.Subtitle>
                <Card.Text><OrderBadge status={order.status * 1} /></Card.Text>
                <Button variant="primary" onClick={() => handleShowDetails(order)} className='btn-orange '>
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
              <p>Étterem: {(selectedOrder != null) ? selectedOrder.place[0].name : null}</p>
              <p><OrderBadge status={selectedOrder.status * 1} /></p>
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
                      <td><img src={`https://res.cloudinary.com/duerxasjk/image/upload/c_fill,h_50,w_50,f_auto,q_auto/${product.image}`} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {
            (selectedOrder != null) ?
              selectedOrder.status == 4 ? <><Button variant="primary" onClick={handleShowRatingModal}>
                Értékel
              </Button></> : <></> : <></>
          }
          <Button variant="secondary" onClick={handleCloseModal}>
            Bezár
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal a rendelés értékeléséhet */}
      <Modal show={showRatingModal} onHide={handleCloseRatingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rendelés értékelés</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>Étterem: {(selectedOrder != null) ? selectedOrder.place[0].name : null}</p>
              <Typography component="legend">Értékelés:</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={handleRatingChange}
              />
              <Typography component="legend">Megjegyzés:</Typography>
              <textarea
                className="form-control"
                rows="3"
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitRating}>
            Értékelés küldése
          </Button>
          <Button variant="secondary" onClick={handleCloseRatingModal}>
            Bezár
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OrdersPage;