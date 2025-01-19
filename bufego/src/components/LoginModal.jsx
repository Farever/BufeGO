import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { sha512 } from 'js-sha512';
import axios from "axios";
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await axios.get(`http://localhost:8000/bejelentkezes?email=${email}`)
        console.log(response.data.valasz[0].passcode);
        if(sha512(password) === response.data.valasz[0].passcode){
          setLoginState(true);
          alert("Sikeres bejelentkezése!");
        }else{
          alert("Sikertelen bejelentkezés! Probálja újra!")
        }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Bejelentkezés:', email, password);
    fetchLogin();
    console.log(loginState);
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