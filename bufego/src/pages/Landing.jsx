import React, { useState, useEffect, useContext } from 'react';
import AuthButton from '../components/AuthButton';
import SchoolCard from '../components/SchoolCard';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/landing.css';
import axios from 'axios';
import PasswordModal from '../components/passwordChange';
import { AuthContext } from '../Contexts';
import { useNavigate } from 'react-router-dom';

const Landing = ({ setLoggedinUser }) => {
    const [schoolsData, setSchoolsData] = useState([]);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            if (userData.is_admin == 1) {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        }
    }, [])

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
                const data = res.data?.valasz;

                // Ellenőrizzük, hogy `valasz` egy tömb-e
                if (Array.isArray(data)) {
                    setSchoolsData(data);
                } else {
                    setSchoolsData([]); // Ha nem tömb, akkor üres tömb
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setSchoolsData([]); // Hiba esetén is üres tömb
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
                    <h1 className='title'>Nagy a sor a büfénél?</h1>
                    <p>Nézd meg a te sulidban ott vagyunk-e már</p>
                </Col>
                <Col xs={12} md={6} className="hero-image text-center">
                    <img src="https://res.cloudinary.com/duerxasjk/image/upload/f_auto,q_auto/coffe-cup" alt="Coffee cup" className="img-fluid" />
                </Col>
            </Row>

            <Row className="schools mx-auto text-center">
                <Col xs={12}>
                    <h2>Iskolák, ahol ott vagyunk</h2>
                </Col>
                <Row>
                    {schoolsData?.map((school, index) => {
                        return (
                            <Col lxs={12} sm={6} md={4} lg={3}>
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

            <PasswordModal isOpen={isPasswordModalOpen} onClose={handleClosePasswordModal} />
            <LoginModal setLoggedinUser={setLoggedinUser} isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} onForgottenPassword={handlePasswordModalOpen} />
            <RegisterModal isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} />
        </Container>
    );
};

export default Landing;