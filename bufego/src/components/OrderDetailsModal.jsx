import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ActionButton from './ActionButton';
import '../styles/OrderDetailsModal.css';
import axios from 'axios';

const OrderDetailsModal = ({ isOpen, onClose, order: initialOrder }) => {
  const [order, setOrder] = useState(initialOrder);
  const [actionButtons, setActionButtons] = useState(null);

  useEffect(() => {
    if (isOpen && initialOrder) {
      setOrder(initialOrder[0]);
    }
  }, [isOpen, initialOrder]);

  useEffect(() => {
    if (order) {
      console.log(order.status);
      generateActionButtons(order.status);
      console.log(actionButtons)
    }
  }, [order]);

  const generateActionButtons = (status) => {
    switch (parseInt(status)) {
      case 1:
        setActionButtons(
          <>
            <ActionButton type={'accept'} onClick={() => handleAccept(order.id)} />
            <br /><br />
            <ActionButton type={'reject'} onClick={() => handleReject(order.id)} />
          </>
        );
        break;
      case 2:
        setActionButtons(
          <>
            <ActionButton type={'done'} onClick={() => handleDone(order.id)} />
          </>
        );
        break;
      case 3:
        setActionButtons(
          <>
            <ActionButton type={'toCostumer'} onClick={() => handleToConsumer(order.id)} />
          </>
        );
        break;
      default:
        setActionButtons(null);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.post('http://localhost/BufeGO/api/index.php/bufe_rendelesstatusz', {
        rendeles_id: orderId,
        status: newStatus,
      });
      setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
    } catch (error) {
      console.error('Hiba a rendelés státuszának frissítésekor:', error);
    }
  };

  const handleAccept = (orderId) => {
    console.log('Elfogadva:', orderId);
    handleStatusChange(orderId, 2);
  };

  const handleReject = (orderId) => {
    console.log('Elutasítva:', orderId);
    handleStatusChange(orderId, 0);
  };

  const handleDone = (orderId) => {
    console.log('Kész:', orderId);
    handleStatusChange(orderId, 3);
  };

  const handleToConsumer = (orderId) => {
    console.log("Kiadva: ", orderId);
    handleStatusChange(orderId, 4);
  }

  if (!isOpen || !order) return null;

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
          <strong>Összesen:</strong>{' '}
          {order.products.reduce((sum, item) => sum + item.quantity * item.price, 0)} Ft
        </p>
        <div>{actionButtons}</div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailsModal;