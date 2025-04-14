import { useState, useEffect } from "react";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";

export default function ProductToCartModal({ product, addToCart, isOpen, onClose }) {
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setQuantity(1);
    }, [isOpen])
    // Az useEffect biztosítja, hogy ne történjen meg a beállítás, ha a product még nem elérhető
    useEffect(() => {
        if (product) {
            setPrice(product.price);
        }
    }, [product]); // Az effect újra lefut, ha a product változik

    function getQuantity(event) {

        if(event.target.value > 99)
        {
            event.target.value = 99;
        }
        setQuantity(event.target.value);
        if (product) {
            setPrice(event.target.value * product.price);
        }
    }

    // Ha nincs termék, ne renderelj semmit
    if (!product) {
        return null;
    }

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={`https://res.cloudinary.com/duerxasjk/image/upload/c_fill,f_auto,q_auto/${product.image}`} alt={product.name} title={product.name} style={{maxWidth: '100%'}}></img>
                <h2 style={{textAlign: "center"}}>{price} Ft</h2>
                <Form>
                    <FormLabel>Mennyiség:</FormLabel>
                    <input type="number" min={1} max={99} onChange={getQuantity} value={quantity} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="float-start" onClick={onClose}>Mégse</Button>
                <Button variant="success" className="float-end" onClick={() => { addToCart(quantity, product.id) }}>Kosárba</Button>
            </Modal.Footer>
        </Modal>
    );
}
