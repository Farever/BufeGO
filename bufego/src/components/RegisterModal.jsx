import React, { useState } from 'react';
import '../styles/RegisterModal.css';

const RegisterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }
    // Itt lehet majd kezelni a regisztrációs logikát
    console.log('Regisztráció:', email, password);
    onClose();
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

          <label htmlFor="confirm-password">Jelszó megerősítése</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Value"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <button type="submit" className="register-button">
            Regisztráció
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;