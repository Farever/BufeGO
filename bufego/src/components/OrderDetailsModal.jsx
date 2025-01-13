import React from 'react';
import { Modal } from 'react-bootstrap';
import ActionButton from './ActionButton';
import '../styles/OrderDetailsModal.css';
import axios from 'axios';
import { useState } from 'react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;
  const[button, setButton] = useState(<></>);

  order = order[0];
  console.log(order);

  const buttons = () => {
    switch (parseInt(order.status)) {
      case 1:
        setButton (
          <>
            <ActionButton type={'accept'} onClick={() => handleAccept(order.id)} />
            <br /><br />
            <ActionButton type={'reject'} onClick={() => handleReject(order.id)} />
          </>
        );
      case 2:
        setButton (
          <>
            <ActionButton type={'done'} onClick={() => handleDone(order.id)} />
          </>
        );
      default:
        return '';
    }
  };

  const handleAccept = (orderId) => {
    console.log('Elfogadva:', orderId);
    axios.post('http://localhost:8000/bufe_rendelesstatusz', {
      rendeles_id : orderId, status : 2
    })
    order.status = 2;
    buttons();
  };

  const handleReject = (orderId) => {
    console.log('Elutasítva:', orderId);
    axios.post('http://localhost:8000/bufe_rendelesstatusz', {
      rendeles_id : orderId, status : 0
    })
    order.status = 0;
    buttons();
  };

  const handleDone = (orderId) => {
    console.log('Kész:', orderId);
    axios.post('http://localhost:8000/bufe_rendelesstatusz', {
      rendeles_id : orderId, status : 3
    })
    order.status = 3;
    buttons();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rendelés részletei</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Rendelés azonosító:</strong> {order.id}
        </p>
        <p>
          <strong>Email:</strong> {order.user[0].email}
        </p>
        <p>
          <strong>Státusz:</strong> {order.status}
        </p>
        <p>
          <strong>Rendelés leadásának ideje:</strong> {order.orderd_at}
        </p>
        <h3>Termékek:</h3>
        <ul>
          {order.products.map((item) => (
            <li key={item.name}>
              {item.name} ({item.quantity} db) - {item.quantity * item.price} Ft
            </li>
          ))}
        </ul>
        <p>
          <strong>Összesen:</strong> {order.products.reduce((sum, item) => sum + item.quantity * item.price, 0)} Ft
        </p>
        <div>
          {buttons()}
          {button}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailsModal;