import React from 'react';
import '../styles/SchoolCard.css';

const SchoolCard = ({ schoolName }) => {
  return (
    <div className="school-card">
      <h3>{schoolName}</h3>
    </div>
  );
};

export default SchoolCard;