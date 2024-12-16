import React from 'react';
import '../styles/SchoolCard.css';

const SchoolCard = ({ school }) => {
  return (
    <div className="school-card">
      <h3>{school.name}</h3>
      <p>{school.address}</p>
    </div>
  );
};

export default SchoolCard;