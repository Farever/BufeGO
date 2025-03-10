import React from 'react';
import { Button } from 'react-bootstrap';
import OrderBadge from './OrderBadge';
import '../styles/admin.css';

const OrderCard = ({ order, onAccept, onReject, onDetails }) => {
  return (
    <div className="order-card">
      <div className="order-row">
        <span className="order-customer">{order.user[0].name}</span>
        <span className="order-status"><OrderBadge status={parseInt(order.status)} /></span>
        <span className="order-date">Átvétel: {order.expected_pickup_time}</span>
      </div>
      <div className="order-row">
        <div className="order-actions">
          {order.status === 'Válaszra vár' && (
            <>
              <Button variant="success" size="sm" onClick={() => onAccept(order.id)}>
                Elfogad
              </Button>
              <Button variant="danger" size="sm" onClick={() => onReject(order.id)}>
                Elutasít
              </Button>
            </>
          )}
          <Button variant="primary" size="sm" onClick={() => onDetails(order.id)}>
            {order.status === 'Elfogadva' && order.isReady ? "Kész" : "Részletek"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;