import React from 'react';
import { Button } from 'react-bootstrap';
import Rating from '@mui/material/Rating';


const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <h3 className="review-customer">{review.name}</h3>
        <p className="review-id">Rendelés: {review.order_id}</p>
        <p>Dátum: {review.date}</p>
      </div>
      <div className="review-content">
      <Rating name="read-only" value={review.rating*1} precision={0.5} readOnly />
        <p className="review-comment">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;