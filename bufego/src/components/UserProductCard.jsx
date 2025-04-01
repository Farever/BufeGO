import { Button, Card } from "react-bootstrap";

export default function UserProductCard({nev, img, ar,isAvaliable, action})
{
    return (
        <>
        <Card role="button" className="w-20 h-100 col-sm-6 col-md-4 col-lg-3" onClick={action} style={{minHeight : 100, margin: 15}}>
            <Card.Img src={`https://res.cloudinary.com/duerxasjk/image/upload/f_auto,q_auto/${img}`} alt={nev} title={nev} />
            <Card.Body>
              <Card.Title>{nev}</Card.Title>
              <Card.Text>
                {ar} Ft
              </Card.Text>
            </Card.Body>
            {
              isAvaliable == '1'? (<></>) : (<Card.Footer><Button type="button" variant="secondary" disabled>Nem elérhető</Button></Card.Footer>)
            }
            {/*
            <Card.Footer>{
              isAvaliable == '1'? (<></>) : (<Button type="button" variant="secondary" disabled>Nem elérhető</Button>)
              }</Card.Footer>
            */}
        </Card>
        </>
    )
}