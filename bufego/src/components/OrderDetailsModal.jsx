import React from 'react';
import { Modal } from 'react-bootstrap';
import ActionButton from './ActionButton';
import '../styles/OrderDetailsModal.css';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const buttons = () => {
    switch (parseInt(order.status)) {
      case 1:
        return (
          <>
            <ActionButton type={'accept'} onClick={() => handleAccept(order.id)} />
            <br /><br />
            <ActionButton type={'reject'} onClick={() => handleReject(order.id)} />
          </>
        );
      case 2:
        return (
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
  };

  const handleReject = (orderId) => {
    console.log('Elutasítva:', orderId);
  };

  const handleDone = (orderId) => {
    console.log('Kész:', orderId);
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
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Státusz:</strong> {order.status}
        </p>
        <p>
          <strong>Rendelés leadásának ideje:</strong> {order.orderd_at}
        </p>
        {/* Ha a termék adatokat is meg szeretnéd jeleníteni, akkor ezt a részt aktiváld:
        <h3>Termékek:</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.name}>
              {item.name} ({item.quantity} db) - {item.quantity * item.price} Ft
            </li>
          ))}
        </ul>
        <p>
          <strong>Összesen:</strong> {order.items.reduce((sum, item) => sum + item.quantity * item.price, 0)} Ft
        </p>
        */}
        <div>{buttons()}</div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailsModal;