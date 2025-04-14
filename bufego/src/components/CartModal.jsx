import { useEffect, useRef, useState, useContext } from "react"
import { Button, Modal, Alert } from "react-bootstrap"
import CartCard from "./CartCard"
import axios from "axios"
import { AuthContext } from '../Contexts';

export default function CartModal({ bufeId, isShown, onClose, frissits, stopFrissit }) {
    const [products, setProducts] = useState([])
    const [vegosszeg, setVegosszeg] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');
    const { userData } = useContext(AuthContext);
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
        if (isShown) {
            getCart();
            setAlertMessage('');
            setAlertVariant('');
        }
    }, [isShown])

    useEffect(() => {
        let finalPrice = 0;
        for (let i of products) {
            finalPrice += i.price * i.quantity
        }
        setVegosszeg(finalPrice);
    }, [products])

    const getCart = async () => {
        try {
            const response = await fetch(`./api/index.php/kosar?place_id=${bufeId}&user_id=${userData.user_id}`);
            if (response.status == 200) {
                let data = await response.json();
                setProducts(data.valasz);
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    const Rendel = async () => {
        try {
            const response = await axios.post("./api/index.php/rendel",
                {
                    "user_id": userData.user_id,
                    "place_id": bufeId,
                    "status": 1,
                    "price": vegosszeg,
                    "payment_method": 1,
                    "products": products
                }
            )

            if (response.status == 200) {
                KosarTorol();
                setAlertMessage("Sikeres rendelés!");
                setAlertVariant('success')
                setProducts("Nincsenek találatok!");
            }
        }
        catch (error) {
            setAlertMessage("Sikertelen rendelés!");
            setAlertVariant('danger')
            console.log(error)
        }
    }

    const KosarTorol = async () => {
        try {
            const response = await fetch("./api/index.php/kosartorles", {
                method: "DELETE",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "user_id": userData.user_id, "place_id": bufeId })
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    if (products != "Nincsenek találatok!") {
        return (
            <Modal show={isShown} onHide={onClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Büfé kosara</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alertMessage && (
                        <Alert
                            variant={alertVariant}
                            onClose={() => { setAlertMessage(''); setAlertVariant('') }}
                            className="mb-3"
                            dismissible
                        >
                            {alertMessage}
                        </Alert>
                    )}
                    {
                        products.map((p, index) => (
                            <CartCard key={index + "termek"} product={p} frissit={getCart} />
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={Rendel}>Rendel</Button>
                    <p>Végösszeg: {formatHUF(vegosszeg)}</p>
                </Modal.Footer>
            </Modal>
        )
    }
    else {
        return (
            <Modal show={isShown} onHide={onClose}>
                <Modal.Header>
                    <p>Büfé kosara</p>
                </Modal.Header>
                <Modal.Body>
                    {alertMessage && (
                        <Alert
                            variant='success'
                            onClose={() => { setAlertMessage('') }}
                            className="mb-3"
                            dismissible
                        >
                            {alertMessage}
                        </Alert>
                    )}
                    {
                        <p>A kosara üres!</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" disabled>Rendel</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}