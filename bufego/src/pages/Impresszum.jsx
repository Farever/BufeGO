import { Container } from "react-bootstrap";

export default function Impresszum() {
    return (
        <Container className="py-5">
            <h1 className="mb-4">Impresszum</h1>

            <p><strong>Weboldal neve:</strong> BüféGO</p>
            <p><strong>Üzemeltető:</strong> VSZC Ipari Technikum – Szoftverfejlesztő és -tesztelő képzés</p>

            <p><strong>Kapcsolat:</strong><br />
                VSZC Ipari Technikum<br />
                8200 Veszprém, Iskola utca 4.<br />
                Email: info.bufego@gmail.com<br />
                Telefon: +36 20 111 8899 (fiktív)
            </p>

            <p><strong>Felelős fejlesztők:</strong><br />
            Név: Nagy Lajos Dominik, Simai Péter Zalán, Végh Dávid Patrik<br />
            Email: info.bufego@gmail.com<br />
            Készült iskolai vizsgamunka keretében, nem hivatalos, kereskedelmi célra nem használható.</p>

            <p><strong>Weboldal célja:</strong><br />
            A BüféGO egy online rendelési rendszer, amely lehetővé teszi az iskolai büfék kínálatának böngészését és előrendelését a tanulók számára.</p>

            <p className="text-muted mt-4" style={{ fontSize: '0.9rem' }}>
                Ez a weboldal kizárólag oktatási célokat szolgál. Az oldalon szereplő adatok, elérhetőségek és termékek nem valódiak.
            </p>
        </Container>
    );
}
