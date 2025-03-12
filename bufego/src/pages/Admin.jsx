import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BuffetCard from '../components/BuffetCard';
import Loading from '../components/Loading';
import axios from 'axios';
import '../styles/admin.css';
import BuffetDetailsModal from '../components/BuffetDetailsModal';

const Admin = () => {
  const [buffets, setBuffets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBuffet, setSelectedBuffet] = useState(null);

  useEffect(() => {
    const fetchBuffets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/admin_fo', {
          params: { admin_id: "4" },
        });
        await setBuffets(response.data.valasz);
        console.log(response.data.valasz)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuffets();
  }, []);

  const handleCloseDetailsModal = () => {
    fetchBuffets();
    setIsDetailsModalOpen(false);
    setSelectedBuffet(null);
  };

  const handleModClick = (buffetId) => {
    setSelectedBuffet(buffets.filter(buffet => buffet.id == buffetId))
    setIsDetailsModalOpen(true);
  }

  return (
    <Container>
      <BuffetDetailsModal
              isOpen={isDetailsModalOpen}
              onClose={handleCloseDetailsModal}
              buffet={selectedBuffet}/>
      <Row>
        <Col>
          <h2>Büféim</h2>
        </Col>
      </Row>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <Row>
        {buffets.map((buffet) => (
          <Col key={buffet.id} xs={12} sm={6} md={4} lg={3}>
            <BuffetCard buffet={buffet} isOnAdminPage={true} onModClick={handleModClick(buffet.id)}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Admin;