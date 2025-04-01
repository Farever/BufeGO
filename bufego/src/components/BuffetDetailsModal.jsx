import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const BuffetDetailsModal = ({ isOpen, onClose, buffet: initialBuffet }) => {
  const [buffet, setBuffet] = useState(initialBuffet);
  const [selectedImage, setSelectedImage] = useState(null); // Új állapot a képhez

  useEffect(() => {
    if (isOpen && initialBuffet) {
      setBuffet(initialBuffet);
    }
  }, [isOpen, initialBuffet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuffet(prevBuffet => ({
      ...prevBuffet,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };


  const handleSave = async () => {
    try {
      const formData = new FormData(); // FormData objektum létrehozása

      // Adatok hozzáadása a FormData-hoz
      formData.append('id', buffet.id);
      formData.append('name', buffet.name);
      formData.append('desc', buffet.description);
      formData.append('phone', buffet.phone);

      if (selectedImage) {
        formData.append('img', selectedImage); // Kép hozzáadása a FormData-hoz
      } else if (buffet.cover_image) {
          formData.append('img', buffet.cover_image);
      }

      const response = await axios.post(`http://localhost/api/index.php/bufemodositas`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Fontos a képküldéshez
        }
      });


      if (response.status === 200) {
        alert(response.data.valasz);
        onClose();
      } else {
        console.error('Hiba a mentés során:', response);
        alert("Hiba a mentés során " . response.status);
      }
    } catch (error) {
      console.error('Hiba a mentés során:', error);
      alert("Hiba: " . error)
    }
  };

  if (!isOpen || !buffet) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Büfé adatai</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*TODO: FORM AZ ADATOK MODÓSÍTÁHOZ*/}
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              placeholder="Büfé neve"
              name="name"
              value={buffet.name || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Büfé leírása"
              name="description"
              value={buffet.description || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Telefonszám</Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefonszám"
              name="phone"
              value={buffet.phone || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCoverImage">
            <Form.Label>Borítókép</Form.Label>
            <Form.Control
              type="file"
              accept="image/*" // Csak képeket fogad el
              onChange={handleImageChange}
            />
             {buffet.cover_image && !selectedImage && ( // Megjeleníti a korábbi képet, ha van és nincs új kiválasztva
                <img
                src={`https://res.cloudinary.com/duerxasjk/image/upload/f_auto,q_auto/${buffet.image}`}
                  alt="Korábbi borítókép"
                  style={{ maxWidth: '100px', marginTop: '10px' }}
                />
              )}
            {selectedImage && (
              <div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Kiválasztott borítókép"
                  style={{ maxWidth: '100px', marginTop: '10px' }}
                />
              </div>
            )}
          </Form.Group>

        </Form>

        <Button variant='primary' onClick={handleSave}>Mentés</Button>
        <Button variant='danger' onClick={onClose}>Mégsem</Button>
      </Modal.Body>
    </Modal>
  );
};

export default BuffetDetailsModal;