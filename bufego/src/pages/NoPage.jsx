import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  return (
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
          <h1 className="display-1 text-warning fw-bold">404</h1>
          <p className="lead">A keresett oldal nem található.</p>
          <p className="text-muted">Lehet, hogy elírtad a címet, vagy az oldal már nem létezik.</p>
          <Button variant="warning" onClick={() => navigate("/")}>
              Vissza a főoldalra
          </Button>
      </Container>
  );
  };
  
  export default NoPage;