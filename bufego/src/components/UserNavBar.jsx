import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, NavItem, NavLink, NavbarText, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // Profil ikon
import { TiShoppingCart } from "react-icons/ti";
import { AuthContext } from '../Contexts';

function Navigation({ cartClickAction }) {
    const location = useLocation();
    const ShowNavbar = location.pathname.startsWith('/home');
    const ShowSchoolSelect = !location.pathname.startsWith('/home/bufe');
    const { setUser } = useContext(AuthContext);

    const Kijelentkezes = async () => {
        try {
            let resp = await fetch('http://localhost/api/index.php/kijelentkezes', { credentials: "include" });
            if (resp.ok) {
                sessionStorage.removeItem("userData");
                setUser({});
                window.location.href = "/#/";
            }
        } catch (error) {
            console.error("Hiba az iskolák lekérésekor:", error);
        }
    }

    if (ShowNavbar && ShowSchoolSelect) {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/home">BüféGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavDropdown title={<FaUserCircle size="1.5em" />} align="end">
                                <NavDropdown.Item as={Link} to="/home/myorders" id='rendeles-nav'>
                                    Rendeléseim
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings">
                                    Beállítások
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={Kijelentkezes}>Kijelentkezés</NavDropdown.Item>
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
                                <NavDropdown.Item as={Link} to="/home/myorders" id='rendeles-nav'>
                                    Rendeléseim
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings">
                                    Beállítások
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={Kijelentkezes}>Kijelentkezés</NavDropdown.Item>
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