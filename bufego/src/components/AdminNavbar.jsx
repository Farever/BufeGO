import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation, Outlet } from 'react-router-dom'; // Importáljuk a useLocation hook-ot
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Profil ikon
import { useNavigate } from 'react-router-dom'
import { AdminBufeContext, AuthContext } from '../Contexts';
import { useContext } from 'react';

const AdminNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Itt adhatod meg, mely útvonalakon jelenjen meg a Navbar
    const showNavbar = ['/admin', '/admin/orders', '/admin/statistics', '/admin/products', '/admin/categories', '/admin/reviews'].includes(location.pathname);

    const [buffets, setBuffets] = useState([]);
    const { userData, setUser } = useContext(AuthContext);
    const { adminBufe, setBufe } = useContext(AdminBufeContext);
    const [bufeId, setBufeId] = useState(
        () => {
            if (adminBufe === null) {
                return '';
            } else {
                return adminBufe.id
            }
        }
    );

    const kijelenkezes = async () => {
        try {
            let resp = await fetch('http://localhost:8000/kijelentkezes', { credentials: "include" });

            if (resp.ok) {
                navigate("/logout");
            }

        } catch (error) {
            console.error("Hiba az iskolák lekérésekor:", error);
        }
    }

    useEffect(() => {
        const fetchBuffets = async () => {
            try {
                const response = await axios.get('http://localhost:8000/admin_fo', {
                    params: { admin_id: userData.user_id },
                });

                if (response.status === 200) {
                    const buffets = response.data?.valasz;

                    if (Array.isArray(buffets)) {
                        setBuffets(buffets);
                    } else {
                        setBuffets([]);
                    }
                }
            } catch (err) {
                console.log(err.message);
                setBuffets([]);
            }
        };

        if (showNavbar) {
            fetchBuffets();
            setBufeId(
                () => {
                    if (adminBufe === null) {
                        return '';
                    } else {
                        return adminBufe.id
                    }
                }
            )
        }
    }, [adminBufe]);

    const handleBufeValasztas = (event) => {
        const ujBufeId = event.target.value;
        setBufeId(ujBufeId);
        const kivalasztottBufe = buffets.find(x => x.id == ujBufeId);
        setBufe(kivalasztottBufe);
        window.location.reload();
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
                                {
                                    adminBufe != null ? (
                                        <>
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
                                        </>)
                                        : (null)}
                            </Nav>
                            <Nav className="me-auto">
                                {(bufeId > 0 ?
                                    <select
                                        className="form-select"
                                        name="bufe"
                                        value={bufeId || ''}
                                        onChange={handleBufeValasztas}
                                    >
                                        {buffets.map((bufe) => (
                                            <option key={bufe.id} value={bufe.id}>
                                                {bufe.name}
                                            </option>
                                        ))}
                                    </select>
                                    : null)}
                            </Nav>
                            <Nav>
                                <NavDropdown title={<FaUserCircle size="1.5em" />} align="end">
                                    <NavDropdown.Item as={Link} to="/settings">Beállítások</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={kijelenkezes}>Kijelentkezés</NavDropdown.Item>
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