import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { sha512 } from 'js-sha512';
import axios from "axios";
import '../styles/LoginModal.css';
import { AuthContext } from '../Contexts';

const LoginModal = ({ isOpen, onClose, onForgottenPassword}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState({});
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);

  const navAfterLogin = (userProfile) =>
  {
    if(userProfile.is_admin == 1)
    {
      navigate("/admin");
    }
    else
    {
        navigate("/home");
    }
  }

  const validateForm = () => {
    const errors = {};

    // Email validáció
    if (!email) {
      errors.email = 'Az email megadása kötelező.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Érvénytelen email-cím.';
    }

    // Jelszó validáció
    if (!password) {
      errors.password = 'A jelszó megadása kötelező.';
    }

    setValidationError(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`./api/index.php/bejelentkezes?email=${email}`, { withCredentials: true });
      console.log(response.data.valasz)
      if (sha512(password) === response.data.valasz[0].passcode) {
        setLoginState(true);
        alert('Sikeres bejelentkezés!');
        let data = await fetch("./api/index.php/sessdata", {
          credentials : "include"
        })
        let user = (await data.json())["valasz"];
        setUser(user);
        navAfterLogin(user);
        console.log(user);
      } else {
        alert('Sikertelen bejelentkezés! Próbálja újra!');
      }
    } catch (err) {
      console.log(err);
      setError('Hiba történt a bejelentkezés során. Kérjük, próbálja újra később.');
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
    if (validateForm()) {
      fetchLogin();
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bejelentkezés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Adja meg az email-címét"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!!validationError.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationError.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              placeholder="Adja meg a jelszavát"
              value={password}
              onChange={handlePasswordChange}
              isInvalid={!!validationError.password}
            />
            <Form.Control.Feedback type="invalid">
              {validationError.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
          </Button>

          <div className="modal-links">
            <a href='#' onClick={onForgottenPassword}>Elfelejtetted a jelszavad?</a>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
