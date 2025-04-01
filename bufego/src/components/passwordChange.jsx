import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { sha512 } from 'js-sha512';
import axios from "axios";
import '../styles/LoginModal.css';

const PasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState({});

    const validateForm = () => {
        const errors = {};

        // Email validáció
        if (!email) {
            errors.email = 'Az email megadása kötelező.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Érvénytelen email-cím.';
        }

        // Jelszó validáció
        if (!password1) {
            errors.password = 'A jelszó megadása kötelező.';
        } else if (password1.length < 6) {
            errors.password = 'A jelszónak legalább 6 karakter hosszúnak kell lennie.';
        }
        if (password1 != password2) {
            errors.password2 = 'A két jelszó nem egyeik.';
        }

        setValidationError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNewPassword = async () => {
        setIsLoading(true);
        setError(null);
        let message;
        try {
            const response = await fetch(`http://localhost/api/index.php/jelszovaltoztat`,
                {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "email": email, "passcode": sha512(password1) })
                }
            );
            message = await response.json();
        } catch (err) {
            setError('Hiba történt. Kérjük, próbálja újra később.');
        } finally {
            setIsLoading(false);
            if(error != null){
                alert(error);
                return 0;
            }
            if (message.valasz == "Sikertelen művelet!") {
                alert("Az új jelszavad nem egyezhet meg a mostanival!");
            } else {
                alert("Sikeres művelet!")
                onClose();
                setEmail('');
                setPassword1('');
                setPassword2('');
            }

        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            handleNewPassword();
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Jelszó változtatás</Modal.Title>
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

                    <Form.Group className="mb-3" controlId="password1">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Adja meg a jelszavát"
                            value={password1}
                            onChange={handlePassword1Change}
                            isInvalid={!!validationError.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationError.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password2">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Adja meg a jelszavát"
                            value={password2}
                            onChange={handlePassword2Change}
                            isInvalid={!!validationError.password2}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationError.password2}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" className="sign-in-button" disabled={isLoading}>
                        {isLoading ? 'Töltés...' : 'Mentés'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PasswordModal;
