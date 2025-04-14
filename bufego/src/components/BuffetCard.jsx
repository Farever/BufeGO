import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import "../styles/BuffetCard.css"

const BuffetCard = ({ buffet, isOnAdminPage = false, onModClick,setBufe }) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const refreshInterval = 5000;

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('./api/index.php/currentrating', {
          params: { place_id: buffet.id },
        });

        if (response.data && response.data.valasz && response.data.valasz.length > 0) {
          const formattedRatings = response.data.valasz.map(item => ({
            current_rating: Number(item.current_rating),
          }));
          setRating(Math.round(formattedRatings[0].current_rating * 2) / 2);
        } else {
          console.warn("No rating data received from the API");
          //Kezelheted itt a helyzetet, amikor nincs adat
          setRating(0);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching ratings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();;
  }, []);

  const handleClick = () => {
    if (isOnAdminPage) {
      setBufe();
      navigate('/admin/orders');
    } else {
      navigate('/home/bufe/' + buffet.id);
    }
  };

  return (
    <Card className="buffet-card shadow-sm rounded-4 overflow-hidden mb-4" style={{ maxWidth: '400px' }}>
  <Card.Img
    variant="top"
    src={`https://res.cloudinary.com/duerxasjk/image/upload/c_fill,w_400,h_200,f_auto,q_auto/${buffet.image}`}
    alt={buffet.name}
    className="object-fit-cover"
    style={{ height: '200px' }}
  />

  <Card.Body className="px-4 py-3">
    <Card.Title className="fs-5 fw-semibold">
      {buffet.name} – {buffet.school}
    </Card.Title>

    <Card.Text className="text-muted small mb-1">{buffet.description}</Card.Text>

    <Card.Text className="mb-1">
      <i className="bi bi-geo-alt text-primary me-1"></i>
      <small>{buffet.zip_code}, {buffet.city}, {buffet.address}</small>
    </Card.Text>

    <Card.Text className="mb-2">
      <i className="bi bi-telephone text-success me-1"></i>
      <small>{buffet.phone}</small>
    </Card.Text>

    <div className="d-flex align-items-center mb-3">
      <Rating name="read-only" value={rating} precision={0.5} readOnly />
      <span className="ms-2 text-muted small">({rating}/5)</span>
    </div>

    {isLoading && <p className="text-secondary small">Értékelés betöltése...</p>}
    {error && <p className="text-danger small">Hiba: {error}</p>}

    <div className="d-flex justify-content-between">
      <Button variant="outline-primary" size="sm" onClick={handleClick}>
        Kiválasztás
      </Button>
      {isOnAdminPage && (
        <Button variant="outline-secondary" size="sm" onClick={onModClick}>
          Módosítás
        </Button>
      )}
    </div>
  </Card.Body>
</Card>

  );
};

export default BuffetCard;