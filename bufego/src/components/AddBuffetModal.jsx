import React, { useState, useEffect,useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../Contexts';

const BuffetAddModal = ({ isOpen, onClose, onBuffetAdded }) => {
  const [formData, setFormData] = useState({
    bufeName: '',
    desc: '',
    phone: '',
    zip: '',
    city: '',
    address: '',
    schoolId: '',
    image: null,
  });
  const [addressId, setAddressId] = useState(null);
  const [schools, setSchools] = useState([]);
  const {userData} = useContext(AuthContext);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("./api/index.php/iskolak");
        setSchools(response.data.valasz);
      } catch (error) {
        console.error("Hiba történt az iskolák lekérése során:", error);
      }
    };
    fetchSchools();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addressResponse = await axios.put(
        "./api/index.php/cimfeltoltes",
        {
          zip: formData.zip,
          city: formData.city,
          address: formData.address,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      
      const newAddressId = addressResponse.data.valasz;
      setAddressId(newAddressId);
      
      const data = new FormData();
      data.append('adminUserId', userData.user_id);
      data.append('bufeName', formData.bufeName);
      data.append('desc', formData.desc);
      data.append('phone', formData.phone);
      data.append('addressId', newAddressId);
      data.append('schoolId', formData.schoolId);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await axios.post('./api/index.php/bufefeltoltes', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      onBuffetAdded();
      onClose();
    } catch (error) {
      console.error('Hiba történt a feltöltés során:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Új büfé hozzáadása</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Név</Form.Label>
            <Form.Control type="text" name="bufeName" onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Leírás</Form.Label>
            <Form.Control type="text" name="desc" onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Telefonszám</Form.Label>
            <Form.Control type="text" name="phone" onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Irányítószám</Form.Label>
            <Form.Control type="text" name="zip" onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Város</Form.Label>
            <Form.Control type="text" name="city" onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cím</Form.Label>
            <Form.Control type="text" name="address" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="school">
            <Form.Label>Iskola</Form.Label>
            <Form.Select
              name="schoolId"
              value={formData.schoolId}
              onChange={handleChange}
              required
            >
              <option value="">Válassz iskolát</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Kép feltöltése</Form.Label>
            <Form.Control type="file" accept="image/*" name="image" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">Mentés</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BuffetAddModal;