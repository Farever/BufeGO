import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";


export default function CategoryModal({isOpen,type, onClose ,categoryDetails, save, del})
{
    const [ujNev, setUjNev] = useState(categoryDetails.categroy_name);
    const [ujHely, setUjHely] = useState(categoryDetails.categroy_name);

    console.log(ujHely, ujNev);

    function GetUjNev(event)
    {
        setUjNev(event.target.value)
    }

    function GetUjHely(event)
    {
        setUjHely(event.target.value)
    }

    function TorleGomb()
    {
        if(type == "mod")
        {
            return(
                <>
                <Button type="button" onClick={()=>del(categoryDetails.id)} variant="danger">Törlés</Button>
                </>
            )
        }
        else
         return(<></>)
    }

    if(!isOpen) return null;

    return(
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{categoryDetails.categroy_name} {type == "mod" ? "részletei" : ""}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <label>Kategória neve:</label>
                    <input type="text" id="NevInput" defaultValue={categoryDetails.categroy_name} onFocus={GetUjNev} onChange={GetUjNev}/>
                    <label>Kategória helye:</label>
                    <input type="number" id="helyInput" defaultValue={categoryDetails.category_placement} onFocus={GetUjHely} onChange={GetUjHely}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{float: "left", textAlign: "left", alignSelf : screenLeft}} className="flex-row" type="button" onClick={onClose} variant="secondary">Mégse</Button>
                {TorleGomb()}
                <Button type="button" onClick={()=>{type == "mod"? save(categoryDetails.id, ujNev ?? categoryDetails.categroy_name, ujHely ?? categoryDetails.category_placement) : save(1, ujNev ?? categoryDetails.categroy_name); onClose()}} variant="success">Mentés</Button>
            </Modal.Footer>
        </Modal>
    )
}