import React, { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';
import Loading from '../components/Loading';
const Reviews = ({bufeId}) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let resp = await fetch('http://localhost:8000/ertekelesek?placeId=' + bufeId.id);
        let data = await resp.json();
    
        console.log(data);
    
        // Ellenőrizzük, hogy a `valasz` létezik és tömb-e
        if (Array.isArray(data.valasz)) {
          setReviews(data.valasz);
        } else {
          setReviews([]); // Ha nem tömb, üres tömböt állítunk be
        }
      } catch (error) {
        setError('Hiba történt az adatok betöltése közben.');
        console.log(error);
        setReviews([]); // Hiba esetén is üres tömb
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