import { useEffect, useRef, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import CartCard from "./CartCard"
import axios from "axios"

export default function CartModal({ isShown, onClose }) {
    const [products, setProducts] = useState([])
    const [vegosszeg, setVegosszeg] = useState(null)

    function formatHUF(number) {
        const formatter = new Intl.NumberFormat('hu-HU', {
          style: 'currency',
          currency: 'HUF',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        return formatter.format(number);
      }

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await axios.get("http://localhost:8000/kosar", {
                    params: {
                        user_id: "1", place_id: "1"
                    }
                })

                if (response.status == 200) {
                    let data = await response.data.valasz;
                    setProducts(data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getCart();
    }, [])

    useEffect(() => {
        let finalPrice = 0;
        for (let i of products) {
            finalPrice += i.price * i.quantity
        }
        setVegosszeg(finalPrice);
    }, [products])

    const Rendel = async () => {
        try {
            const response = await axios.post("http://localhost:8000/rendel",
                {
                    "user_id": 1,
                    "place_id": 1,
                    "status": 1,
                    "price": vegosszeg,
                    "payment_method": 1,
                    "products": products
                }
            )

            if (response.status == 200) {
                alert("Rendelését leadtuk!");
                setProducts([]);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={isShown} onHide={onClose}>
            <Modal.Header>
                <p>Büfé kosara</p>
            </Modal.Header>
            <Modal.Body>
                {products.map((p, index) => (
                    <CartCard key={index + "termek"} product={p} />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={Rendel}>Rendel</Button>
                <p>Végösszeg: {formatHUF(vegosszeg)}</p>
            </Modal.Footer>
        </Modal>
    )
}