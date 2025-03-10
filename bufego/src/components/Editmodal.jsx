import { Form, Modal, Button, Alert } from "react-bootstrap"
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ActionButton from "./ActionButton";

function Editmodal()
{
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Termék hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Termék neve</Form.Label>
                            <Form.Control type="text" ref={product_name}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kategória</Form.Label>
                            <Form.Select ref={category}>
                            {
                                categories.map((category)=>{
                                    return <option key={category.id} value={category.id}>{category.categroy_name}</option>
                                })
                            }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kép</Form.Label>
                            <Form.Control type="file" ref={img}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Leírás</Form.Label>
                            <Form.Control type="text" ref={product_desc}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Allergének</Form.Label>
                            <Form.Control type="text" ref={allergens}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Elérhető" className="checkbox" ref={availability}></Form.Check>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ár</Form.Label>
                            <Form.Control type="number" ref={price}/>
                        </Form.Group>
                    </Form>
                    <Alert variant={uploadstatus}>{responseMessage}</Alert>
                </Modal.Body>
                <Modal.Footer>
                
                <ActionButton type="cancel" onClick={handleClose}></ActionButton>
                <ActionButton type="ok" onClick={() => {
                    uploadProduct();
                }}></ActionButton>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Editmodal;