import AuthButton from '../components/AuthButton';
import SchoolCard from '../components/SchoolCard';
import schoolsData from '../schools.json';
import '../styles/landing.css';

const Home = () => {
    return( <div className="app">
        <header className="header">
          <div className="logo">BüféGO</div>
          <div className="auth-buttons">
            <AuthButton type="login" />
            <AuthButton type="register" />
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
          <div className="schools-grid">
            {schoolsData.map((school, index) => (
              <SchoolCard key={index} school={school} />
            ))}
          </div>
        </section>
  
        <section className="call-to-action">
          <h2>Esetleg büféd van?</h2>
          <div className="cta-box">
            <p>Szolgálj ki még több embert és csatlakozz hozzánk partnerként</p>
            <a href="#" className="cta-button">Jelentkezz most</a>
          </div>
        </section>
      </div>
    );
  };
  
  export default Home;