import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation, Outlet } from 'react-router-dom'; // Importáljuk a useLocation hook-ot

const AdminNavbar = () => {
    const location = useLocation();

    // Itt adhatod meg, mely útvonalakon jelenjen meg a Navbar
    const showNavbar = ['/admin', '/admin/orders', '/admin/statistics', '/admin/products', '/admin/categories', '/admin/reviews'].includes(location.pathname);

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
                            <span className="location-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </span>
                            <span className="location-text">Ipari büfé</span>
                            <span className="dropdown-icon">
                                <i className="fas fa-caret-down"></i>
                            </span>
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