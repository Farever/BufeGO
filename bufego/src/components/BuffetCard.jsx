import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
const refreshInterval = 5000;

const BuffetCard = ({ buffet, isOnAdminPage = false }) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/currentrating', {
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

    fetchRatings();

    const intervalId = setInterval(fetchRatings, refreshInterval)

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    console.log(isOnAdminPage);
    if (isOnAdminPage) {
      console.log("Admin" + buffet.id);
    } else {
      console.log("User" + buffet.id);
    }
  };

  return (
    <Card className="buffet-card">
      <Card.Img variant="top" src={buffet.image} />
      <Card.Body>
        <Card.Title>
          {buffet.name} - {buffet.school}
        </Card.Title>
        <Card.Text>{buffet.description}</Card.Text>
        <Card.Text>
          {buffet.zip_code}, {buffet.city}, {buffet.address}
        </Card.Text>
        <Card.Text>{buffet.phone}</Card.Text>

        {/* Értékelés megjelenítése */}
        <Card.Text>
          Értékelés: <Rating name="read-only" value={rating} precision={0.5} readOnly /> ({rating}/5)
        </Card.Text>
        {isLoading && <p>Loading ratings...</p>}
        {error && <p>Error: {error}</p>}

        <Button variant="primary" onClick={handleClick} className="button">
          Megtekintés
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BuffetCard;