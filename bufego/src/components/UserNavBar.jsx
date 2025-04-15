import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, NavItem, NavLink, NavbarText, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // Profil ikon
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Contexts';

function Navigation({ cartClickAction }) {
    const [iskolak, setIskolak] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const ShowNavbar = location.pathname.startsWith('/home');
    const ShowSchoolSelect = !location.pathname.startsWith('/home/bufe');
    const { userData, setUser } = useContext(AuthContext);
    const [school, setSchool] = useState(userData.school_id);

    useEffect(() => {
        const fetchIskolak = async () => {
            try {
                let resp = await fetch('./api/index.php/iskolak');
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
        setSchool(iskolaId);
        setUser({
            "user_id": userData.user_id,
            "is_admin": userData.is_admin,
            "school_id": iskolaId
        })
        window.location.reload();
    };

    const kijelenkezes = async () => {
        try {

            let resp = await fetch('./api/index.php/kijelentkezes', { credentials: "include" });

            if (resp.ok) {
                navigate("/logout");
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
                        <Nav className="me-auto">
                            <select className='form-select' name='iskola' onChange={handleIskolaValasztas} value={school || ''}>
                                {iskolak.map(iskola => (
                                    <option key={iskola.id} value={iskola.id}>
                                        {iskola.name}
                                    </option>
                                ))}
                            </select>
                        </Nav>
                        <Nav>
                        <NavDropdown title={<FaUserCircle size="1.5em" />} align="end">
                                <NavDropdown.Item as={Link} to="/home/myorders" id='rendeles-nav'>
                                    Rendeléseim
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings">
                                    Beállítások
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={kijelenkezes}>Kijelentkezés</NavDropdown.Item>
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
                                <NavDropdown.Item onClick={kijelenkezes}>Kijelentkezés</NavDropdown.Item>
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