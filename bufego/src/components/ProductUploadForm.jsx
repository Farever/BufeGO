import { Form, Modal, Button, Alert } from "react-bootstrap"
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ActionButton from "./ActionButton";
import "../styles/UploadModal.css"


const ProductUploadForm = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [uploadstatus, setUploadStatus] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get('http://localhost/13c-vegh/api/index.php/kategoriak', {
            params: { 
                bufeId: 1
            },
          });
    
          setCategories(response.data.valasz);
        } catch (err) {
          console.log(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        fetchCategories();
    
        const intervalId = setInterval(fetchCategories, refreshInterval);
    
        return () => clearInterval(intervalId);
      }, [refreshInterval]);

      const uploadProduct = async() => {
        console.log(category.current.value)
        let response = await fetch('http://localhost/13c-vegh/api/index.php/termek_felv', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                place: place_id,
                category: category.current.value,
                img: img.current.value,
                name: product_name.current.value,
                description: product_desc.current.value,
                allergens: allergens.current.value,
                is_avaliable: availability.current.checked,
                price: parseFloat(price.current.value)
            })
        })
        let data = await response.json();
        if(response.ok)
        {
            setUploadStatus("success")
            setResponseMessage("Sikeres adatfelvétel");
        }
        else
        {
            setUploadStatus("danger");
            setResponseMessage(data.valasz);
        }
        
    }


    let place_id = 1;
    const product_name = useRef("");
    const category = useRef("");
    const img = useRef("");
    const product_desc = useRef("");
    const allergens = useRef("");
    const availability = useRef(true);
    const price = useRef(0);
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
                            <Form.Label>Kép placeholder</Form.Label> {/*TODO Kép feltöltését megoldani */}
                            <Form.Control type="text" ref={img}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" ref={product_desc}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Alergens</Form.Label>
                            <Form.Control type="text" ref={allergens}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Available" className="checkbox" ref={availability}></Form.Check>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label> {/*TODO Kép feltöltését megoldani */}
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
    );
}

export default ProductUploadForm;