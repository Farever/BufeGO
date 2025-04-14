import { useEffect, useRef, useState} from "react";
import { Row,Card, CardBody, Button } from "react-bootstrap";

export default function CartCard({product, frissit})
{
    const [newQuantity, setNewQuantity] = useState(0)
    const [disabled, setDisabled ]= useState(true)

    const frissitQuantity = (event) =>
    {
        if(event.target.value > 99)
        {
            event.target.value = 99;
        }
        setNewQuantity(event.target.value);
        setDisabled(false);
    }   

    const modQuantity = async () => {
        try
        {            
            const response = await fetch("http://localhost:8000/kosarmod", {
                method :"POST",
                headers:
                {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({"id": product.cid, "quantity" : newQuantity})
            })

            if(response.ok)
            {
                frissit();
                setDisabled(true);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

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
            const response = await fetch("./api/index.php/kosartargytorles", {
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
                <Row style={{height : "30%"}}>
                    <p className="col-3">{product.name}</p>
                    <input type="number" variant="primary" max={99} className="col-1 hagyjadBeken" defaultValue={product.quantity} onChange={frissitQuantity}/><p className="col-2">db</p>
                    <Button variant="primary" id={product.id} className="col-3" onClick={modQuantity} disabled={disabled}>Mentés</Button>
                    <p className="col-3">{product.price * product.quantity} Ft</p>
                </Row>
                <Row>
                    <Button variant="danger" onClick={deletAlert}>X</Button>
                </Row>
            </CardBody>
        </Card>
    )
}