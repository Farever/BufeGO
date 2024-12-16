import React, { useState } from 'react';
import AuthButton from '../components/AuthButton';
import SchoolCard from '../components/SchoolCard';
import LoginModal from '../components/loginModal';
import RegisterModal from '../components/RegisterModal';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
import '../styles/landing.css';

const Home = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleRegisterClick = () => {
        setIsRegisterModalOpen(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };


    return (<div className="app">
        <header className="header">
            <div className="logo">BüféGO</div>
            <div className="auth-buttons">
                <AuthButton type="login" onClick={handleLoginClick} />
                <AuthButton type="register" onClick={handleRegisterClick} />
            </div>
        </header>

        <section className="hero">
            <div className="hero-content">
                <h1>Nagy a sor a büfénél?</h1>
                <p>Nézd meg a te sulidban ott vagyunk-e már</p>
            </div>
            <div className="hero-image">
                <img src="../src/assets/images/coffe-cup.png" alt="Coffee cup" />
            </div>
        </section>

        <section className="schools">
            <h2>Iskolák, ahol ott vagyunk</h2>
            <Get url={"http://localhost/api/index2.php/iskolak"}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (response !== null) {
                        let schoolsData = response['data']['valasz'];
                        console.log(schoolsData);
                        return (
                            <div className="schools-grid">
                                {schoolsData.map((school, index) => (
                                    <SchoolCard key={index} schoolName={school.name} />
                                ))}
                            </div>
                        );
                    }
                }}
            </Get>
        </section>

        <section className="call-to-action">
            <h2>Esetleg büféd van?</h2>
            <div className="cta-box">
                <p>Szolgálj ki még több embert és csatlakozz hozzánk partnerként</p>
                <a href="#" className="cta-button">Jelentkezz most</a>
            </div>
        </section>

        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} />
    </div>
    );
};

export default Home;