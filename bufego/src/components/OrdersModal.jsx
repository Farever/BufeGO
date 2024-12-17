import React, { useState } from 'react';
import ActionButton from './ActionButton';
import OrderBadge from './OrderBadge';
import OrderDetailsModal from './OrderDetailsModal';
import { Modal } from 'react-bootstrap';
import '../styles/OrdersModal.css';

const OrdersModal = ({ isOpen, onClose, orders }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Beérkező rendelések</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orders.length === 0 ? (
          <p>Nincs rendelésed.</p>
        ) : (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <div className="order-details">
                  <OrderBadge status={parseInt(order.status)} />
                  <p>
                    <strong>Rendelés azonosító:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.email} 
                  </p>
                </div>
                <div className="order-actions">
                  <ActionButton type="details" onClick={() => handleDetails(order)} />
                </div>
              </li>
            ))}
          </ul>
        )}

        <OrderDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          order={selectedOrder}
        />
      </Modal.Body>
    </Modal>
  );
};

export default OrdersModal;