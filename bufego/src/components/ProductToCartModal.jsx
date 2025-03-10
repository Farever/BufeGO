import { use } from "react";
import { useState } from "react"
import { Button, Form, FormLabel, Modal } from "react-bootstrap"

export default function ProductToCartModal({product, addToCart, isOpen, onClose})
{
    const [price, setPrice] = new useState(product.price);
    const [quantity, setQuantity] = new useState(0);

    function getQuantity(event)
    {
        setQuantity(event.target.value);
        setPrice(event.target.value * product.price);
    }

    return(
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={product.image} alt={product.name} title={product.name}></img>
                <p>{price}Ft</p>
                <Form>
                    <FormLabel>Mennyiség:</FormLabel>
                    <input type="number" min={1} max={99} onChange={getQuantity}/>
                </Form>
                <Button variant="success" onClick={()=>{addToCart(quantity, product.id)}}>Kosárba</Button>
            </Modal.Body>
        </Modal>
    )
}