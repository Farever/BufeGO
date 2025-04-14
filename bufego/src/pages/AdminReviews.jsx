import React, { useState, useEffect, useContext } from 'react';
import ReviewCard from '../components/ReviewCard';
import Loading from '../components/Loading';
import { AdminBufeContext } from '../Contexts';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {adminBufe} = useContext(AdminBufeContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let resp = await fetch('http://localhost:8000/ertekelesek?placeId=' + adminBufe.id);
        let data = await resp.json();
    
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
  }, [adminBufe]);

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