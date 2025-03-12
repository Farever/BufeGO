import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ActionButton from './ActionButton';
import axios from 'axios';

const BuffetDetailsModal = ({ isOpen, onClose, initialBuffet }) => {
  const [buffet, setBuffets] = useState(initialBuffet);

  useEffect(() => {
    if (isOpen && initialBuffet) {
      setOrder(initialBuffet[0]);
    }
  }, [isOpen, initialBuffet]);

  const handleSave = async () => {
    {/*TODO: backend elérése, adatok elküldése*/}
  };

  if (!isOpen || !buffet) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Büfé adatai</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*TODO: FORM AZ ADATOK MODÓSÍTÁHOZ*/}
        <Button variant='primary' onClick={handleSave}>Mentés</Button>
        <Button variant='danger' onClick={onClose}>Mégsem</Button>
      </Modal.Body>
    </Modal>
  );
};

export default BuffetDetailsModal;