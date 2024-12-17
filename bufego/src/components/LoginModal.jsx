import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
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
    console.log('Bejelentkezés:', email, password);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bejelentkezés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Value"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              placeholder="Value"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button type="submit" className="sign-in-button">
            Bejelentkezés
          </Button>

          <div className="modal-links">
            <a href="#">Elfelejtetted a jelszavad?</a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;