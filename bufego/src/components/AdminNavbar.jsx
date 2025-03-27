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
              const response = await axios.get('http://localhost:8000/admin_fo', {
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

        fetchBuffets();
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
                        <Navbar.Brand href="/admin">BüféGO</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Item>
                                    <Nav.Link href='/admin/orders' id='nav-orders'>Rendelések</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/admin/statistics' id='nav-stats'>Statisztika</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/admin/products' id='nav-products'>Termékek</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/admin/categories' id='nav-categories'>Kategóriák</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/reviews" id='nav-reviews'>Értékelések</Nav.Link>
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
                                    <NavDropdown.Item as={Link} to="/settings">Beállítások</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/logout">Kijelentkezés</NavDropdown.Item>
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