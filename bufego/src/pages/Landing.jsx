import React, { useState, useEffect } from 'react';
import AuthButton from '../components/AuthButton';
import SchoolCard from '../components/SchoolCard';
import LoginModal from '../components/loginModal';
import RegisterModal from '../components/RegisterModal';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/landing.css';
import axios from 'axios';
import PasswordModal from '../components/passwordChange';

const Landing = () => {
    const [schoolsData, setSchoolsData] = useState([]);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handlePasswordModalOpen = () => {
        setIsPasswordModalOpen(true);
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    const handleRegisterClick = () => {
        setIsRegisterModalOpen(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/iskolak`)
            .then(res => {
                const data = res.data.valasz;
                setSchoolsData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    return (
        <Container> {/* Használjuk a Container komponenst */}
            <Row className="header align-items-center">
                <Col xs={12} md={6} className="logo">
                    BüféGO
                </Col>
                <Col xs={12} md={6} className="auth-buttons d-flex justify-content-end">
                    <AuthButton type="login" onClick={handleLoginClick} />
                    <AuthButton type="register" onClick={handleRegisterClick} />
                </Col>
            </Row>

            <Row className="hero">
                <Col xs={12} md={6} className="hero-content">
                    <h1>Nagy a sor a büfénél?</h1>
                    <p>Nézd meg a te sulidban ott vagyunk-e már</p>
                </Col>
                <Col xs={12} md={6} className="hero-image text-center">
                    <img src="../src/assets/images/coffe-cup.png" alt="Coffee cup" className="img-fluid" />
                </Col>
            </Row>

            <Row className="schools mx-auto text-center">
                <Col xs={12}>
                    <h2>Iskolák, ahol ott vagyunk</h2>
                </Col>
                <Row className='justify-content-around'>
                    {schoolsData?.map((school, index) => {
                        return (
                            <Col lg={4} md={6} className="schools-grid mx-auto">
                                <SchoolCard key={'schoolsCard' + index} schoolName={school.name} />
                            </Col>
                        )
                    })}
                </Row>
            </Row>

            <Row className="call-to-action text-center justify-content-center">
                <Col xs={12} md={8}>
                    <h2>Esetleg büféd van?</h2>
                    <div className="cta-box">
                        <p>Szolgálj ki még több embert és csatlakozz hozzánk partnerként</p>
                        <a href="#" className="cta-button">Jelentkezz most</a>
                    </div>
                </Col>
            </Row>

            <PasswordModal isOpen={isPasswordModalOpen} onClose={handleClosePasswordModal}/>
            <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} onForgottenPassword={handlePasswordModalOpen} />
            <RegisterModal isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} />
        </Container>
    );
};

export default Landing;