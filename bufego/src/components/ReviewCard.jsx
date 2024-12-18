import React from 'react';
import { Button } from 'react-bootstrap';

const ReviewCard = ({ review }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <i key={index} className={`fas fa-star ${index < review.rating ? 'filled' : ''}`}></i>
  ));

  return (
    <div className="review-card">
      <div className="review-header">
        <span className="review-customer">{review.customer}</span>
        <span className="review-id">#{review.productId}</span>
      </div>
      <div className="review-content">
        <div className="review-stars">{stars}</div>
        <p className="review-comment">{review.comment}</p>
        <Button variant="primary" size="sm">
          Részletek
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;