import { Button, Card } from "react-bootstrap";
import '../styles/UserProduct.css'; // új stílusfájl

export default function UserProductCard({ nev, img, ar, isAvaliable, action }) {
    return (
        <Card 
            role="button" 
            className="user-product-card" 
            onClick={action}
        >
            <Card.Img 
                className="product-image" 
                src={`https://res.cloudinary.com/duerxasjk/image/upload/c_fill,f_auto,q_auto/${img}`} 
                alt={nev} 
                title={nev} 
            />
            <Card.Body>
                <Card.Title>{nev}</Card.Title>
                <Card.Text>{ar} Ft</Card.Text>
            </Card.Body>

            {isAvaliable !== '1' && (
                <Card.Footer>
                    <Button type="button" variant="secondary" disabled>Nem elérhető</Button>
                </Card.Footer>
            )}
        </Card>
    );
}
