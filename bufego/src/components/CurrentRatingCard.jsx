import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Card } from 'react-bootstrap';
import "../styles/Stats.css"

function CurrentRatingCard({ bufeId }) {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const refreshInterval = 5000;

  const fetchRatings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('./api/index.php/currentrating', {
        params: { place_id: bufeId },
      });

      const formattedRatings = response.data.valasz.map(item => ({
        current_rating: Number(item.current_rating),
      }));

      setRating(formattedRatings[0].current_rating);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();

    const intervalId = setInterval(fetchRatings, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return (
    <div className="col-sm-12 col-md-12">
      <Card className='rating text-center w-50'>
        <Card.Title>
          Jelenlegi értékelés
        </Card.Title>
        <Card.Body>
          <Card.Text>
            {error ? (
              <div className="text-danger">Hiba: {error}</div>
            ) : (
              <Rating
                className="rating"
                name="read-only"
                value={Math.round(rating * 2) / 2}
                precision={0.5}
                readOnly
              />
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CurrentRatingCard;