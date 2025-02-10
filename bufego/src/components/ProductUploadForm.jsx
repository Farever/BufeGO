import { Form, Modal, Button } from "react-bootstrap"
import { useState } from "react";
import ActionButton from "./ActionButton";
import "../styles/UploadModal.css"


const ProductUploadForm = () => {
    const place_id = 1;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <div className='text-center m-3'>
                <ActionButton type="add" onClick={handleShow}></ActionButton>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Termék neve</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kategória</Form.Label> {/*TODO Lekérni kategóriákat és generálni dropdownt */}
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kép placeholder</Form.Label> {/*TODO Kép feltöltését megoldani */}
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label> {/*TODO Kép feltöltését megoldani */}
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Alergens</Form.Label> {/*TODO Kép feltöltését megoldani */}
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Available" className="checkbox"></Form.Check>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label> {/*TODO Kép feltöltését megoldani */}
                            <Form.Control type="number" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <ActionButton type="reject" onClick={handleClose}></ActionButton>
                <ActionButton type="accept" onClick={handleClose}></ActionButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductUploadForm;