import React from 'react';
import '../styles/AuthButton.css';

const AuthButton = ({ type }) => {
  return (
    <button className={`auth-button ${type}`}>
      {type === 'login' ? 'Bejelentkezés' : 'Regisztráció'}
    </button>
  );
};

export default AuthButton;