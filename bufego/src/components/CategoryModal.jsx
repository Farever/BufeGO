import { Modal, Form, Button } from "react-bootstrap";


export default function CategoryModal({isOpen, onClose ,categoryDetails, save})
{

    if(!isOpen) return null;

    return(
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{categoryDetails.categroy_name} részletei</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <input type="text" defaultValue={categoryDetails.categroy_name}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={onClose} variant="danger">Mégse</Button>
                <Button type="button" onClick={save} variant="success">Mentés</Button>
            </Modal.Footer>
        </Modal>
    )
}