import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation, Outlet } from 'react-router-dom'; // Importáljuk a useLocation hook-ot
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Profil ikon

const AdminNavbar = () => {
    const location = useLocation();

    // Itt adhatod meg, mely útvonalakon jelenjen meg a Navbar
    const showNavbar = ['/admin', '/admin/orders', '/admin/statistics', '/admin/products', '/admin/categories', '/admin/reviews'].includes(location.pathname);

    const [buffets, setBuffets] = useState([]);

    useEffect(() => {
        const fetchBuffets = async () => {
            try {
                const response = await axios.get('http://localhost/BufeGO/api/index.php/admin_fo', {
                    params: { admin_id: "1" },
                });

                if (response.status === 200) {
                    const buffets = response.data?.valasz;

                    // Ellenőrizzük, hogy `valasz` egy tömb-e
                    if (Array.isArray(buffets)) {
                        setBuffets(buffets);
                    } else {
                        setBuffets([]); // Ha nem tömb, akkor üres tömb
                    }
                }
            } catch (err) {
                console.log(err.message);
                setBuffets([]); // Hiba esetén is üres tömb
            }
        };

        if (showNavbar) {
            fetchBuffets();
        }
    }, []);

    const handleBufeValasztas = (event) => {
        const bufeId = event.target.value;
        // Itt végezheted el az iskola ID-jával kapcsolatos műveleteket, pl. navigálás
        console.log("Kiválasztott bufe ID:", bufeId);
        //például:
        //navigate(`/iskola/${iskolaId}`);
    };


    if (showNavbar) {
        return (
            <>
                <Navbar bg="light" expand="lg" style={{ visibility: showNavbar ? 'visible' : 'hidden' }}>
                    <Container>
                        <LinkContainer to="/admin">
                            <Navbar.Brand href="/admin">BüféGO</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Item>
                                    <LinkContainer to="/admin/orders">
                                        <Nav.Link id='nav-orders'>Rendelések</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/admin/statistics">
                                        <Nav.Link id='nav-stats'>Statisztika</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/admin/products">
                                        <Nav.Link id='nav-products'>Termékek</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/admin/categories">
                                        <Nav.Link id='nav-categories'>Kategóriák</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/admin/reviews">
                                        <Nav.Link id='nav-reviews'>Értékelések</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                            </Nav>
                            <Nav className="me-auto">
                                {buffets && Array.isArray(buffets) && buffets.length > 0 ? (
                                    <select
                                        className="form-select"
                                        name="bufe"
                                        onChange={handleBufeValasztas}
                                    >
                                        <option value="">Válassz büfét</option>
                                        {buffets.map((bufe) => (
                                            <option key={bufe.id} value={bufe.id}>
                                                {bufe.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : null}
                            </Nav>
                            <Nav>
                                <NavDropdown title={<FaUserCircle size="1.5em" />} align="end">
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

                <Outlet />
            </>
        );
    }

    return (<></>);
};

export default AdminNavbar;