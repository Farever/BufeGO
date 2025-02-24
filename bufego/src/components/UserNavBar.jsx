import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Profil ikon

function Navigation() {
    const [iskolak, setIskolak] = useState([]);
    const location = useLocation();

    const ShowNavbar = location.pathname.startsWith('/home');

    useEffect(() => {
        const fetchIskolak = async () => {
            try {
                let resp = await fetch('http://localhost:8000/iskolak');
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

    if (ShowNavbar) {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/home">BüféGO</Navbar.Brand>
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
                                <NavDropdown.Item as={Link} to="/orders">Rendeléseim</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings">Beállítások</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/logout">Kijelentkezés</NavDropdown.Item>
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