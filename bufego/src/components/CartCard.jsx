import { Row,Card, CardBody, Button } from "react-bootstrap";

export default function CartCard({product, frissit})
{


    const deletAlert = () =>
    {
        let mehet = confirm("Biztosan törli az elemet a kosátból?");

        if(mehet)
        {
            deleteItem();
        }
    }

    const deleteItem = async () => {
        try
        {
            const response = await fetch("http://localhost/api/index.php/kosartargytorles", {
                method :"DELETE",
                headers:
                {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({"id": product.cid})
            })

            if(response.ok)
            {
                frissit();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <Card>
            <CardBody>
                <Row>
                    <p className="col-3">{product.name}</p>
                    <p className="col-3">{product.quantity} db</p>
                    <p className="col-3">{product.price * product.quantity} Ft</p>
                    <Button className="col-3" variant="danger" onClick={deletAlert}>X</Button>
                </Row>
            </CardBody>
        </Card>
    )
}