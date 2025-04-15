import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Rolunk = () => {
  const teamMembers = [
    { name: 'Nagy Lajos Dominik', img: 'dominik.jpg', text : '' },
    { name: 'Simai Péter Zalán', img: 'zalán.jpg', text : '' },
    { name: 'Végh Dávid Patrik', img: 'dávid.jpg', text : '' },
  ];

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Rólunk</h1>
      <p className="text-center">
        Ez a projekt a szakmai vizsga keretében készült a VSZC Ipari Technikumban, szoftverfejlesztő- és tesztelő szakon.
        Célunk egy modern, könnyen kezelhető iskolai büfé rendelési rendszer megvalósítása volt, amely segíti a tanulókat és az
        iskola dolgozóit a gyors és hatékony rendelésben.
      </p>

      <h2 className="mt-5 text-center">A csapat</h2>
      <Row className="mt-4 justify-content-center">
        {teamMembers.map((member, idx) => (
          <Col key={idx} xs={12} md={4} className="d-flex justify-content-center mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={'./src/img/'+member.img} alt={`${member.name} portré`} />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Rolunk;
