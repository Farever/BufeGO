import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/BuffetCard.css';

const BuffetCard = ({ buffet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(buffet.id)
  };

  return (
    <Card className="buffet-card">
      <Card.Img variant="top" src={buffet.image} />
      <Card.Body>
        <Card.Title>{buffet.name} - {buffet.school}</Card.Title>
        <Card.Text>{buffet.description}</Card.Text>
        <Card.Text>{buffet.zip_code}, {buffet.city}, {buffet.address}</Card.Text>
        <Card.Text>{buffet.phone}</Card.Text>
        <Button variant="primary" onClick={handleClick} className='button'>
          Megtekintés
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BuffetCard;