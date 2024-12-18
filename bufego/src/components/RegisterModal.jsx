import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/RegisterModal.css';

const RegisterModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://localhost/13c-nagyl/api/index2.php/iskolak'); // Az adatbázis elérésének útvonala
        setSchools(response.data.valasz);
      } catch (err) {
        setError(err.message || 'Hiba történt az iskolák lekérése közben.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchSchools();
    }
  }, [isOpen]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSchoolChange = (event) => {
    setSchool(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleZipChange = (event) => {
    setZip(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('A jelszavak nem egyeznek!');
      return;
    }
    console.log('Regisztráció:', email, password, school, address, phone);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Regisztráció</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 col-md-12" controlId="email"> {/* Hozzáadva: col-md-12 */}
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vezetéknév"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <Form.Control
              type="text"
              placeholder="Keresztnév"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-12" controlId="email"> {/* Hozzáadva: col-md-12 */}
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="pelda@pelda.com"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="password"> {/* Hozzáadva: col-md-12 */}
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="confirm-password"> {/* Hozzáadva: col-md-12 */}
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control
              type="password"
              placeholder="Jelszó mégegyszer"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="school"> {/* Hozzáadva: col-md-12 */}
            <Form.Label>Iskola</Form.Label>
            <Form.Select value={school} onChange={handleSchoolChange} disabled={isLoading}>
              <option value="">Válassz iskolát</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </Form.Select>
            {error && <div className="text-danger">{error}</div>}
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="address"> {/* Hozzáadva: col-md-12 */}
            <Form.Label>Számlázási cím</Form.Label>
            <Form.Control
              type="text"
              placeholder="Irányítószám"
              value={zip}
              onChange={handleZipChange}
            />
            <Form.Control
              type="text"
              placeholder="Város"
              value={city}
              onChange={handleCityChange}
            />
            <Form.Control
              type="text"
              placeholder="Cím"
              value={address}
              onChange={handleAddressChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="phone"> {/* Hozzáadva: col-md-12 */}
            <Form.Label>Telefonszám</Form.Label>
            <Form.Control
              type="tel"
              placeholder="+36 20 123 4567"
              value={phone}
              onChange={handlePhoneChange}
            />
          </Form.Group>

          <Button type="submit" className="register-button">
            Regisztráció
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;