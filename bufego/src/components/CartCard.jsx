import { Row,Card, CardBody, Button } from "react-bootstrap";

export default function CartCard({product})
{
    return(
        <Card>
            <CardBody>
                <Row>
                    <p className="col-3">{product.name}</p>
                    <p className="col-3">{product.quantity}</p>
                    <p className="col-3">{product.price * product.quantity}</p>
                    <Button className="col-3" variant="danger">X</Button>
                </Row>
            </CardBody>
        </Card>
    )
}