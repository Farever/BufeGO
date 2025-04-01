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

    const Kijelentkezes = async () => {
        try {
            let resp = await fetch('http://localhost/api/index.php/kijelentkezes', { credentials: "include" });
            if (resp.ok) {
                sessionStorage.removeItem("userData");
                sessionStorage.removeItem("adminBufe")
                window.location.href = "/#/";
            }
        } catch (error) {
            console.error("Hiba az iskolák lekérésekor:", error);
        }
    }


    if (!showNavbar) return null;

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/admin">BüféGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {["orders", "statistics", "products", "categories", "reviews"].map((item) => (
                                <Nav.Item key={item}>
                                    <Nav.Link as={Link} to={`/admin/${item}`} id={`nav-${item}`}>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                        <Nav>
                            <NavDropdown title={<FaUserCircle size="1.5em" />} align="end">
                                <NavDropdown.Item as={Link} to="/settings">Beállítások</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={Kijelentkezes}>Kijelentkezés</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavbar;