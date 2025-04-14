import { Container, Accordion } from "react-bootstrap";

export default function Gyik() {
    return (
        <Container className="py-5">
            <h1 className="mb-4">Gyakran Ismételt Kérdések (GYIK)</h1>

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Hogyan tudok rendelni az oldalról?</Accordion.Header>
                    <Accordion.Body>
                        A rendeléshez először be kell jelentkezned vagy regisztrálnod. Ezután kiválaszthatod a megfelelő iskolát és böngészheted a büfé kínálatát. A kívánt termékeket kosárba helyezheted, majd leadhatod a rendelést.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Kell-e regisztrálnom a rendeléshez?</Accordion.Header>
                    <Accordion.Body>
                        Igen, a rendeléshez regisztráció és bejelentkezés szükséges. Így tudjuk nyomon követni a rendeléseket, és biztosítani, hogy mindenki a saját iskolája büféjéből rendel.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Mikor vehetem át a rendelésem?</Accordion.Header>
                    <Accordion.Body>
                        A leadott rendeléseket a büfé dolgozói dolgozzák fel. A rendelés részleteinél és a visszaigazoló felületen látni fogod, mikorra lesz kész a csomagod.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Fizethetek online?</Accordion.Header>
                    <Accordion.Body>
                        Jelenleg a rendszer csak helyszíni fizetést támogat. A jövőben tervezzük az online fizetési lehetőségek bevezetését.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>Hogyan vehetek részt partnerként?</Accordion.Header>
                    <Accordion.Body>
                        Ha büfét üzemeltetsz és szeretnél csatlakozni a BüféGO-hoz, kattints a főoldalon található „Jelentkezz most” gombra a partner szekcióban, és vedd fel velünk a kapcsolatot!
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}
