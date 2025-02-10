import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation, Outlet } from 'react-router-dom'; // Importáljuk a useLocation hook-ot
import axios from 'axios';

const AdminNavbar = () => {
    const location = useLocation();

    // Itt adhatod meg, mely útvonalakon jelenjen meg a Navbar
    const showNavbar = ['/admin', '/admin/orders', '/admin/statistics', '/admin/products', '/admin/categories', '/admin/reviews'].includes(location.pathname);

    const [buffets, setBuffets] = useState([]);
  
    useEffect(() => {
        const fetchBuffets = async () => {
          try {
            const response = await axios.get('http://localhost:8000/admin_fo', {
              params: { admin_id: "4" },
            });
            await setBuffets(response.data.valasz);
          } catch (err) {
            console.log(err.message);
          }
        };
    
        fetchBuffets();
      }, []);


    if (showNavbar) {
        return (
            <>
                <Navbar bg="light" expand="lg" style={{ visibility: showNavbar ? 'visible' : 'hidden' }}>
                    <Container>
                        <Navbar.Brand href="/admin">BüféGO</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            {/* Mindig rendereljük a Nav komponenst, de a tartalmát elrejtjük, ha a showNavbar false */}
                            <Nav className="me-auto">
                                <Nav.Item>
                                    <Nav.Link href='/admin/orders'>Rendelések</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/admin/statistics'>Statisztika</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/admin/products'>Termékek</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/admin/categories'>Kategóriák</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/reviews">Értékelések</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                        <div className="user-info">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><i className="bi bi-geo-alt-fill"></i></span>
                                <select className="form-select d-inline">
                                    {
                                        buffets.map((buffet) => (
                                            <option value={buffet.id} key={"bufe+" + buffet.id}>{buffet.name}</option>
                                          ))
                                    }
                                </select>
                            </div>

                            <span className="user-icon">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </Container>
                </Navbar>

                <Outlet />
            </>
        );
    }

    return (<></>);
};

export default AdminNavbar;