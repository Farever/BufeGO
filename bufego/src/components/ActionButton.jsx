import React from 'react';
import '../styles/ActionButton.css';

const ActionButton = ({ type, onClick }) => {
  const getButtonClass = () => {
    switch (type) {
      case 'accept':
        return 'accept-button';
      case 'reject':
        return 'reject-button';
      case 'details':
        return 'details-button';
      case 'done':
        return 'done-button';
      case 'add':
        return 'accept-button';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'accept':
        return 'Elfogad';
      case 'reject':
        return 'Elutasít';
      case 'details':
        return 'Részletek';
      case 'done':
        return 'Elkészült';
      case 'add':
        return 'Új hozzáadása';
      default:
        return 'Gomb';
    }
  };

  return (
    <button className={`action-button ${getButtonClass()}`} onClick={onClick}>
      {getButtonText()}
    </button>
  );
};

export default ActionButton;