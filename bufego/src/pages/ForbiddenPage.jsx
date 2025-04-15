import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 text-danger fw-bold">403</h1>
      <p className="lead">Hozzáférés megtagadva.</p>
      <p className="text-muted">
        Nincs jogosultságod az oldal megtekintéséhez, vagy be kell jelentkezned.
      </p>
      <Button variant="danger" onClick={() => navigate("/")}>
        Vissza a főoldalra
      </Button>
    </Container>
  );
};

export default ForbiddenPage;
