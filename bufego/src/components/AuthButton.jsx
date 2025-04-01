import React from 'react';
import '../styles/AuthButton.css';

const AuthButton = ({ type, onClick }) => {
  return (
    <button className={`auth-button ${type}`} onClick={onClick}>
      {type === 'login' ? 'Bejelentkezés' : 'Regisztráció'}
    </button>
  );
};

export default AuthButton;