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
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');
    const [validationError, setValidationError] = useState({});

    const clearAlert = () => {
        setAlertMessage('');
        setAlertVariant('');
    };

    const handleClose = () => {
        clearAlert();
        setValidationError({});
        setEmail('');
        setPassword1('');
        setPassword2('');
        onClose();
    };


    const validateForm = () => {
        const errors = {};
        clearAlert();

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
        clearAlert();
        let message = null;
        try {
            const response = await fetch(`http://localhost:8000/jelszovaltoztat`,
                {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "email": email, "passcode": sha512(password1) })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP hiba: ${response.status}`);
            }

            message = await response.json();
            if (message.valasz === "Sikertelen művelet!") {
                setAlertMessage("Az új jelszavad nem egyezhet meg a mostanival!");
                setAlertVariant('warning');
            } else if (message.valasz === "Sikeres művelet!") {
                setAlertMessage("Sikeres művelet!");
                setAlertVariant('success');
                setTimeout(() => {
                    handleClose();
                }, 1500);
            } else {
                setAlertMessage(message.valasz || 'Ismeretlen válasz a szervertől.');
                setAlertVariant('info');
            }

        } catch (err) {
            console.error("API hiba:", err);
            setAlertMessage('Hiba történt a kapcsolat során. Kérjük, próbálja újra később.');
            setAlertVariant('danger');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (validationError.email) setValidationError(prev => ({ ...prev, email: undefined }));
    };

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
        if (validationError.password) setValidationError(prev => ({ ...prev, password: undefined }));
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
        if (validationError.password2) setValidationError(prev => ({ ...prev, password2: undefined }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        clearAlert();
        if (validateForm()) {
            handleNewPassword();
        }
    };

    return (
        <Modal show={isOpen} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Jelszó változtatás</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {alertMessage && (
                        <Alert
                            variant={alertVariant}
                            onClose={clearAlert}
                            dismissible
                        >
                            {alertMessage}
                        </Alert>
                    )}

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
