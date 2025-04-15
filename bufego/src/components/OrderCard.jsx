import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import OrderBadge from './OrderBadge';
import { BsClock } from 'react-icons/bs';

const OrderCard = ({ order, onAccept, onReject, onDetails }) => {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body>
        <Row className="align-items-center mb-2">
          <Col xs={8}>
            <h5 className="mb-1">{order.user[0].name}</h5>
            <div className="text-muted small d-flex align-items-center">
              <BsClock className="me-1" />
              Átvétel: {order.expected_pickup_time}
            </div>
          </Col>
          <Col xs={4} className="text-end">
            <OrderBadge status={parseInt(order.status)} />
          </Col>
        </Row>

        <div className="d-flex justify-content-end flex-wrap gap-2">
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
          <Button variant="outline-primary" size="sm" onClick={() => onDetails(order.id)}>
            {order.status === 'Elfogadva' && order.isReady ? 'Kész' : 'Részletek'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
