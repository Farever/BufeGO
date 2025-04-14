import React from 'react';
import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../styles/footer.css';


const Footer = () => {
    return (
        <footer className="py-3 mt-3">
            <Container>
                <Row>
                    <Col xs={6} md={2} className="mb-3">
                        <h5>Oldaltérkép</h5>
                        <Nav className="flex-column">
                            <Nav.Item className="mb-2">
                                <Nav.Link as={Link} to="/" className="p-0 text-body-secondary">Főoldal</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Col xs={6} md={2} className="mb-3">
                        <h5>Jogi tudnivalók</h5>
                        <Nav className="flex-column">
                            <Nav.Item className="mb-2">
                                <Nav.Link as={Link} to="/impressum" className="p-0 text-body-secondary">Impresszum</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link as={Link} to="/adatkezelesi-tajekoztato" className="p-0 text-body-secondary">Adatkezelési tájékoztató</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link as={Link} to="/aszf" className="p-0 text-body-secondary">ÁSZF</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-2">
                                <Nav.Link as={Link} to="/gyik" className="p-0 text-body-secondary">GYIK</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Col xs={6} md={2} className="mb-3">
                        <h5>Kapcsolat</h5>
                        <Nav className="flex-column">
                            <Nav.Item className="mb-2">
                                <Nav.Link as={Link} to="/kapcsolat" className="p-0 text-body-secondary">Kapcsolat</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    {/*
                    <Col md={5} className="offset-md-1 mb-3">
                        <Form>
                            <h5>Iratkozz fel hírlevelünkre</h5>
                            <p>Értesülj a legfrissebb hírekről és akciókról.</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <Form.Label htmlFor="newsletter" visuallyHidden>
                                    Email cím
                                </Form.Label>
                                <Form.Control id="newsletter" type="text" placeholder="Email cím" />
                                <Button variant="primary" type="button">
                                    Feliratkozás
                                </Button>
                            </div>
                        </Form>
                    </Col>
                    */}
                </Row>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>© {new Date().getFullYear()} BüféGO, Minden jog fenntartva.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </a>
                        </li>
                    </ul>
                </div>
            </Container>
        </footer >
    );
};

export default Footer;