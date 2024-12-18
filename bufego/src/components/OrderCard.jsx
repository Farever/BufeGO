import React from 'react';
import { Button } from 'react-bootstrap';

const OrderCard = ({ order, onAccept, onReject, onDetails }) => {
    return (
        <div className="order-card">
            <div className="order-header">
                <span className="order-customer">{order.customer}</span>
                <span className="order-status">{order.status}</span>
            </div>
            <div className="order-details">
                <ul>
                    {order.items.map((item, index) => (
                        <li key={index}>
                            {item.name} ({item.quantity} db)
                        </li>
                    ))}
                </ul>
            </div>
            <div className="order-footer">
                <span className="order-date">Átvétel: {order.date}</span>
                <div className="order-actions">
                    {!order.isReady && (
                        <>
                            <Button variant="success" size="sm" onClick={() => onAccept(order.id)}>
                                Elfogad
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => onReject(order.id)}>
                                Elutasít
                            </Button>
                        </>
                    )}
                    <Button variant="secondary" size="sm" onClick={() => onDetails(order.id)}>
                        {order.isReady ? "Kész" : "Részletek"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;