import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";


export default function CategoryModal({isOpen,type, onClose ,categoryDetails, save, del})
{
    const [ujNev, setUjNev] = useState(categoryDetails.categroy_name);

    function GetUjNev(event)
    {
        setUjNev(event.target.value)
    }

    if(!isOpen) return null;

    return(
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{categoryDetails.categroy_name} {type == "mod" ? részletei : ""}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <label>Kategória neve:</label>
                    <input type="text" id="NevInput" defaultValue={categoryDetails.categroy_name} onChange={GetUjNev}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{float: "left", textAlign: "left", alignSelf : screenLeft}} className="flex-row" type="button" onClick={onClose} variant="secondary">Mégse</Button>
                <Button type="button" onClick={()=>del(categoryDetails.id)} variant="danger">Törlés</Button>
                <Button type="button" onClick={()=>{type == "mod"? save(categoryDetails.id, ujNev) : save(1, ujNev); onClose()}} variant="success">Mentés</Button>
            </Modal.Footer>
        </Modal>
    )
}