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

    const refreshInterval = 5000;

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8000/kategoriak', {
                params: {
                    bufeId: 1
                },
            });
            if (Array.isArray(response.data.valasz)) {
                setCategories(response.data.valasz.filter(x => x.deleted == 0));
            } else {
                setCategories([]);
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchCategories();

        const intervalId = setInterval(fetchCategories, refreshInterval);

        return () => clearInterval(intervalId);
    }, [refreshInterval]);

    const uploadProduct = async () => {
        const formData = new FormData();
        formData.append('place', place_id);
        formData.append('category', category.current.value);
        formData.append('img', img.current.files[0]);
        formData.append('name', product_name.current.value);
        formData.append('description', product_desc.current.value);
        formData.append('allergens', allergens.current.value);
        formData.append('is_avaliable', availability.current.checked);
        formData.append('price', parseFloat(price.current.value));


        let response = await fetch('http://localhost:8000/termek_felv', {
            method: "POST",
            body: formData
        })
        let data = await response.json();
        if (response.ok) {
            handleClose();
        }
        else {
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


    useEffect(() => {
        if (!show) {
            setUploadStatus("");
            setResponseMessage("");
        }
    }, [show])

    return (
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
                            <Form.Control type="text" ref={product_name} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kategória</Form.Label>
                            <Form.Select ref={category}>
                                {
                                    categories.map((category) => {
                                        return <option key={category.id} value={category.id}>{category.categroy_name}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kép</Form.Label>
                            <Form.Control type="file" ref={img} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Leírás</Form.Label>
                            <Form.Control type="text" ref={product_desc} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Allergének</Form.Label>
                            <Form.Control type="text" ref={allergens} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Elérhető" className="checkbox" ref={availability}></Form.Check>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ár</Form.Label>
                            <Form.Control type="number" ref={price} />
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