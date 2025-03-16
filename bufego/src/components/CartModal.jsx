import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import CartCard from "./CartCard"
import axios from "axios"

export default function CartModal({isShown, onClose})
{
    const[products, setProducts] = useState([])
    const[vegosszeg, setVegosszeg] = useState(0)

    let finalPrice = 0;
    useEffect(() => {
        const getCart = async () => {
            try
            {
                const response = await axios.get("http://localhost:8000/kosar", {params : {
                    user_id : "1", place_id : "1"}
                })

                if(response.status == 200)
                {
                    let data = await response.data.valasz;
                    setProducts(data);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        }

        function vegosszegSzamitas()
        {
            finalPrice = 0;
            for(let i of products)
            {
                finalPrice += i.price * i.quantity
            }
            setVegosszeg(finalPrice);
        }

        vegosszegSzamitas()
        getCart();
    }, [])

    const Rendel = async () =>
    {
        try
        {
            const response = await axios.post("http://localhost:8000/rendel",
                {
                    "user_id" : 1,
                    "place_id" : 1,
                    "status" : 1,
                    "price" : finalPrice,
                    "payment_method" : 1,
                    "products" : products
                }
            )

            if(response.status == 200)
            {
                alert("Rendelését leadtuk!");
                setProducts([]);
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }
    
    return(
        <Modal show={isShown} onHide={onClose}>
            <Modal.Header>
                <p>Büfé kosara</p>
            </Modal.Header>
            <Modal.Body>
                {products.map((p) => (
                    <CartCard key={p.id} product={p} />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={Rendel}>Rendel</Button>
                <p>Végösszeg: {vegosszeg}</p>
            </Modal.Footer>
        </Modal>
    )
}