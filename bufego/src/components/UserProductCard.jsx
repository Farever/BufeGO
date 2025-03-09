import { Button, Card } from "react-bootstrap";

export default function UserProductCard({nev, img, ar, action})
{

    return (
        <>
        <Card className="w-20 h-100 col-sm-6 col-md-4 col-lg-3" style={{minHeight : 100}}>
            <Card.Img src={img} alt={nev} title={nev} />
            <Card.Body>
              <Card.Title>{nev}</Card.Title>
              <Card.Text>
                {ar} Ft
              </Card.Text>
            </Card.Body>
            <Card.Footer><Button type="button" onClick={action}>+</Button></Card.Footer>
        </Card>
        </>
    )
}