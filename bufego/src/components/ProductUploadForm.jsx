import { Form, Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react";
import axios from 'axios';
import ActionButton from "./ActionButton";
import "../styles/UploadModal.css"


const ProductUploadForm = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
        let response = await fetch('http://localhost/13c-vegh/api/index.php/termek_felv', {
            headers: {
                Content_Type: "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                place: "",
                category: "",
                img: "",
                name: "",
                description: "",
                allergens: "",
                is_available: "",
                price: ""
            })
        })
        console.log(response);
      }


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
                <Modal.Title>Termék hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Termék neve</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kategória</Form.Label>
                            <Form.Select>
                            {
                                categories.map((category)=>{
                                    return <option key={category.id} value={category.categroy_name}>{category.categroy_name}</option>
                                })
                            }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kép placeholder</Form.Label> {/*TODO Kép feltöltését megoldani */}
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Alergens</Form.Label>
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