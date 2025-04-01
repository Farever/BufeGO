import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BuffetCard from '../components/BuffetCard';
import Loading from '../components/Loading';
import BuffetAddModal from '../components/AddBuffetModal';
import axios from 'axios';
import '../styles/admin.css';
import BuffetDetailsModal from '../components/BuffetDetailsModal';
import { AdminBufeContext } from '../Contexts';

const Admin = () => {
  const [userId, setUserId] = useState(null);
  const [buffets, setBuffets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBuffet, setSelectedBuffet] = useState(null);

  const  {adminBufe, setBufe} = useContext(AdminBufeContext);

  const fetchBuffets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let resp = await fetch("http://localhost:8000/sessdata", {
        credentials: "include"
      });
      let data = await resp.json();
      if (data.valasz && data.valasz.user_id) {
        const response = await axios.get('http://localhost:8000/admin_fo', {
          params: { admin_id: data.valasz.user_id },
        });
        if(Array.isArray(response.data.valasz)){
          setBuffets(response.data.valasz);
        }else{
          setBuffets([]);
        }
        
      } else {
        throw new Error("Sikertelen munkamenet adat lekérés");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuffets();
  }, []);

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBuffet(null); // Csak a selectedBuffet-et állítjuk nullra
  };

  const handleModClick = (buffetId) => {
    setSelectedBuffet(buffets.find(buffet => buffet.id == buffetId));
    console.log(selectedBuffet);
    setIsDetailsModalOpen(true);
  };

  const handleAddBuffet = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleBuffetAdded = () => {
    fetchBuffets();
  };


  return (
    <Container>
      <BuffetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        buffet={selectedBuffet}
      />
      <BuffetAddModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onBuffetAdded={handleBuffetAdded} />
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Büféim</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleAddBuffet}>+ Új büfé</Button>
        </Col>
      </Row>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <Row>
        {buffets.length > 0 ? (
          buffets.map((buffet) => (
            <Col key={buffet.id} xs={12} sm={6} md={4} lg={3}>
              <BuffetCard
                buffet={buffet}
                setBufe={() => setBufe(buffet)}
                isOnAdminPage={true}
                onModClick={() => handleModClick(buffet.id)}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>Nincs még regisztrált büfé!</Col>
        )}
      </Row>
    </Container>
  );
};

export default Admin;