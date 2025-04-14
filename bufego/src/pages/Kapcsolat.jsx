import { Container, Form, Button, Row, Col } from "react-bootstrap";

export default function Kapcsolat() {
    return (
        <Container className="py-5">
            <h1 className="mb-4">Kapcsolat</h1>
            <p>Ha bármilyen kérdésed vagy észrevételed van, vedd fel velünk a kapcsolatot az alábbi űrlap kitöltésével!</p>
            
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Név</Form.Label>
                            <Form.Control type="text" placeholder="Add meg a neved" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email cím</Form.Label>
                            <Form.Control type="email" placeholder="Add meg az email címed" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Tárgy</Form.Label>
                    <Form.Control type="text" placeholder="Miben segíthetünk?" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Üzenet</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Írd ide az üzeneted..." />
                </Form.Group>

                <Button variant="warning" type="submit">
                    Küldés
                </Button>
            </Form>

            <hr className="my-5" />

            <div>
                <h5>Elérhetőségek</h5>
                <p><strong>Email:</strong> info@bufego.hu</p>
                <p><strong>Telefonszám:</strong> +36 30 123 4567</p>
                <p><strong>Cím:</strong> 1234 Budapest, Iskolai utca 10.</p>
            </div>
        </Container>
    );
}
