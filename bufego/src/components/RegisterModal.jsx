import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { sha512 } from 'js-sha512';
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
  const [addId, setAddId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
    console.log(school);
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

  const sendAddressAndRegister = async () => {
    setIsLoading(true);
    setError(null);

    if (!validateForm()) {
      alert(error);
      return;
    }

    try {
      const addressResponse = await axios.post(
        "http://localhost:8000/cimfeltoltes",
        {
          zip: zip,
          city: city,
          address: address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newAddId = addressResponse.data.valasz;
      setAddId(newAddId);
    
      const registerResponse = await axios.post(
        "http://localhost:8000/felhasznaloregisztracio",
        {
          email: email,
          passcode: sha512(password),
          name: lastName + " " + firstName,
          address_id: newAddId,
          phone: phone,
          school: school,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (registerResponse.data && registerResponse.data.valasz) {
        setSuccessMessage("Sikeres regisztráció!");
        console.log("Sikeres regisztráció:", registerResponse.data.valasz);
      } else if (registerResponse.data && registerResponse.data.valasz && registerResponse.data.status === 400){
          setError(registerResponse.data.valasz);
      }
      else {
        setError("Hiba a regisztráció során!");
      }
    } catch (err) {
      setError(err.message || "Hiba a regisztráció során!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }
    if (zip === "" && city === "" && address === "") {
      alert("A cím megadása nem megfelelő!");
      return;
    }
    sendAddressAndRegister();

    console.log("Regisztráció:", email, password, school, address, phone);
    onClose();
  };

  const validateForm = () => {
    if (!email) {
      setError("Az email cím megadása kötelező!");
      return false;
    }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        setError("Hibás email formátum!");
        return false;
      }
    if (!password) {
      setError("A jelszó megadása kötelező!");
      return false;
    }
    if (password.length < 6) {
      setError("A jelszó minimum 6 karakter hosszú kell, hogy legyen!")
      return false;
    }
    if (!firstName) {
      setError("A név megadása kötelező!");
      return false;
    }
    if (!lastName) {
      setError("A név megadása kötelező!");
      return false;
    }
    if (!phone) {
        setError("A telefonszám megadása kötelező!")
        return false;
    }
      if (!/^\+?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone)) {
        setError("Hibás telefonszám formátum!");
          return false;
      }
    if (!school) {
      setError("Az iskola megadása kötelező!");
      return false;
    }

    setError(null);
    return true;
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Regisztráció</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 col-md-12">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vezetéknév"
              value={lastName}
              onChange={handleLastNameChange}
              id="lastName"
            />
            <Form.Control
              type="text"
              placeholder="Keresztnév"
              value={firstName}
              onChange={handleFirstNameChange}
              id="firstName"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-12" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="pelda@pelda.com"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="password">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="confirm-password">
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control
              type="password"
              placeholder="Jelszó mégegyszer"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="school">
            <Form.Label>Iskola</Form.Label>
            <Form.Select
              value={school}
              onChange={handleSchoolChange}
              disabled={isLoading}
            >
              <option value="">Válassz iskolát</option>
              {schools.map((school) => (
                <option key={'schools' + school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </Form.Select>
            {error && <div className="text-danger">{error}</div>}
          </Form.Group>

          <Form.Group className="mb-3 col-md-12">
            <Form.Label>Számlázási cím</Form.Label>
            <Form.Control
              type="text"
              placeholder="Irányítószám"
              value={zip}
              onChange={handleZipChange}
              id="zip"
            />
            <Form.Control
              type="text"
              placeholder="Város"
              value={city}
              onChange={handleCityChange}
              id="city"
            />
            <Form.Control
              type="text"
              placeholder="Cím"
              value={address}
              onChange={handleAddressChange}
              id="address"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-12" controlId="phone">
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