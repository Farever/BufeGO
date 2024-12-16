import React, { useState } from 'react';
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Itt lehet majd kezelni a bejelentkezési logikát
    console.log('Bejelentkezés:', email, password);
    onClose(); // Bezárja a modalt sikeres bejelentkezés után
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Value"
            value={email}
            onChange={handleEmailChange}
          />

          <label htmlFor="password">Jelszó</label>
          <input
            type="password"
            id="password"
            placeholder="Value"
            value={password}
            onChange={handlePasswordChange}
          />

          <button type="submit" className="sign-in-button">
            Sign In
          </button>

          <div className="modal-links">
            <a href="#">Elfelejtetted a jelszavad?</a>
            <a href="#">Nincs még fiókod?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;