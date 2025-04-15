import React, { useState, useEffect, useContext } from 'react';
import BuffetCard from "../components/BuffetCard";
import CarouselComponent from "../components/Carousel";
import { Container, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import axios from 'axios';
import { AuthContext } from '../Contexts';

const Home = () => {
  const [buffets, setBuffets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {userData} = useContext(AuthContext)

  useEffect(() => {
    const fetchBuffets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/userbufe', {
          params: { school_Id: userData.school_id },
        });
    
        const buffets = response.data?.valasz;
        if (Array.isArray(buffets)) {
          setBuffets(buffets);
        } else {
          setBuffets([]);
        }
      } catch (err) {
        setError(err.message);
        setBuffets([]);
      } finally {
        setIsLoading(false);
      }
    };
    

    fetchBuffets();
  }, [userData.school_Id]);

  return (
    <>
      <Container>
        <CarouselComponent />
        <h2 className='display-6'>Közeledben lévő büfék</h2>
        {isLoading && <Loading />}
        {error && <div className="error-message">{error}</div>}
        <Row>
          {buffets.map((buffet) => (
            <Col key={buffet.id} xs={12} sm={6} md={4} lg={3} className='d-flex align-items-stretch'>
              <BuffetCard buffet={buffet} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )


};

export default Home;