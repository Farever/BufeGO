import React, { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';
import Loading from '../components/Loading';
import data from '../data.json';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulált API hívás a lokális JSON adatbázisból
        const response = { data: data.reviews };
        setReviews(response.data);
      } catch (error) {
        setError('Hiba történt az adatok betöltése közben.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Értékelések</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="reviews-grid">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;