import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, NavItem, NavLink, NavbarText, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Profil ikon
import { TiShoppingCart } from "react-icons/ti";
import { LinkContainer } from 'react-router-bootstrap';

function Navigation({ cartClickAction }) {
    const [iskolak, setIskolak] = useState([]);
    const location = useLocation();

    const ShowNavbar = location.pathname.startsWith('/home');
    const ShowSchoolSelect = !location.pathname.startsWith('/home/bufe');

    useEffect(() => {
        const fetchIskolak = async () => {
            try {
                let resp = await fetch('http://localhost/BufeGO/api/index.php/iskolak');
                let data = await resp.json();
                setIskolak(data.valasz);
            } catch (error) {
                console.error("Hiba az iskolák lekérésekor:", error);
            }
        };

        fetchIskolak();
    }, []);

    const handleIskolaValasztas = (event) => {
        const iskolaId = event.target.value;
        // Itt végezheted el az iskola ID-jával kapcsolatos műveleteket, pl. navigálás
        console.log("Kiválasztott iskola ID:", iskolaId);
        //például:
        //navigate(`/iskola/${iskolaId}`);
    };

    if (ShowNavbar && ShowSchoolSelect) {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <LinkContainer to="/home">
                        <Navbar.Brand as={Link} to="/home">BüféGO</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <select className='form-select' name='iskola' onChange={handleIskolaValasztas}>
                                <option value="">Válassz iskolát</option>
                                {iskolak.map(iskola => (
                                    <option key={iskola.id} value={iskola.id}>
                                        {iskola.name}
                                    </option>
                                ))}
                            </select>
                        </Nav>
                        <Nav>
                            <NavDropdown title={<FaUserCircle size="1.5em" />} align="end">
                                <LinkContainer to="/home/myorders">
                                    <NavDropdown.Item id='rendeles-nav'>Rendeléseim</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/settings">
                                    <NavDropdown.Item>Beállítások</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to="/logout">
                                    <NavDropdown.Item>Kijelentkezés</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
    if (ShowNavbar && !ShowSchoolSelect) {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/home">BüféGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Navbar.Brand id='cart_nav' size="1.5em" role="button" onClick={cartClickAction} > <TiShoppingCart size="1.5em" /> </Navbar.Brand>
                            <NavDropdown title={<FaUserCircle size="1.5em" />} align="end">
                                <LinkContainer to="/home/myorders">
                                    <NavDropdown.Item id='rendeles-nav'>Rendeléseim</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/settings">
                                    <NavDropdown.Item>Beállítások</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to="/logout">
                                    <NavDropdown.Item>Kijelentkezés</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

    return (<></>)
}

export default Navigation;