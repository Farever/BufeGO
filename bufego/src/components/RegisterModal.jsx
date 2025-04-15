import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { sha512 } from "js-sha512";
import axios from "axios";
import "../styles/RegisterModal.css";

const RegisterModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [school, setSchool] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [addId, setAddId] = useState(null);

  const clearFormFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSchool("");
    setAddress("");
    setZip("");
    setCity("");
    setPhone("");
    setError(null);
    setSuccessMessage(null);
    setAddId(null);
  };

  const handleClose = () => {
    clearFormFields();
    onClose();
  };

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/iskolak");
        setSchools(response.data.valasz);
      } catch (err) {
        setError(err.message || "Hiba történt az iskolák lekérése közben.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchSchools();
    }
  }, [isOpen]);

  const validateForm = () => {
    if (!firstName || !lastName) {
      setError("A név megadása kötelező!");
      return false;
    }
    if (!email) {
      setError("Az email cím megadása kötelező!");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Hibás email formátum!");
      return false;
    }
    if (!password) {
      setError("A jelszó megadása kötelező!");
      return false;
    }
    if (password.length < 6) {
      setError("A jelszó minimum 6 karakter hosszú kell, hogy legyen!");
      return false;
    }
    if (password !== confirmPassword) {
      setError("A jelszavak nem egyeznek!");
      return false;
    }
    if (!phone || !/^\+?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone)) {
      setError("Hibás telefonszám formátum!");
      return false;
    }
    if (!school) {
      setError("Az iskola megadása kötelező!");
      return false;
    }
    if (!zip || !city || !address) {
      setError("A cím megadása nem megfelelő!");
      return false;
    }
    setError(null);
    return true;
  };

  const sendAddressAndRegister = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const addressResponse = await axios.put(
        "http://localhost:8000/cimfeltoltes",
        { zip, city, address },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAddId = addressResponse.data.valasz;
      setAddId(newAddId);

      const registerResponse = await axios.put(
        "http://localhost:8000/felhasznaloregisztracio",
        {
          "email" : email,
          "passcode": sha512(password),
          "name": `${lastName} ${firstName}`,
          "address_id": newAddId,
          "phone" : phone,
          "school" : school,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (registerResponse.data && registerResponse.data.valasz) {
        setSuccessMessage("Sikeres regisztráció!");
        setError(null);
        handleClose();

        var templateParams = {
          name: lastName + " " + firstName,
          email: email,
          link: 'http://localhost:8000/emailmegerosites?email=' + email,
        };

        emailjs.send('service_wnwawhk', 'template_3gys6bf', templateParams).then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
          },
          (error) => {
            console.log('FAILED...', error);
          },
        );

      } else {
        setSuccessMessage("");
        setError(registerResponse.data.valasz || "Hiba a regisztráció során!");
      }
    } catch (err) {
      setSuccessMessage("");
      setError(err.message || "Hiba a regisztráció során!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      sendAddressAndRegister();
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Regisztráció</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vezetéknév"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Keresztnév"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="pelda@pelda.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control
              type="password"
              placeholder="Jelszó mégegyszer"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="school">
            <Form.Label>Iskola</Form.Label>
            <Form.Select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            >
              <option value="">Válassz iskolát</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Számlázási cím</Form.Label>
            <Form.Control
              type="text"
              placeholder="Irányítószám"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Város"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Cím"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefonszám</Form.Label>
            <Form.Control
              type="tel"
              placeholder="+36 20 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? "Folyamatban..." : "Regisztráció"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
