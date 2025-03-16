import { Form, Modal, Button, Alert } from "react-bootstrap"
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ActionButton from "./ActionButton";

function Editmodal({show, handleClose, product})
{
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [uploadstatus, setUploadStatus] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const refreshInterval = 5000;

    let place_id = 1;
    const product_name = useRef("");
    const category = useRef("");
    const img = useRef("");
    const product_desc = useRef("");
    const allergens = useRef("");
    const availability = useRef(true);
    const price = useRef(0);

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get('http://localhost:8000/kategoriak', {
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

      const editProduct = async() => {
        console.log(category.current.value)
        /*
        const formData = new FormData();
        formData.append('id', product.id);
        formData.append('category_id', category.current.value);
        formData.append('image', "https://piccadillypizzeria.hu/storage/app/public/admin-assets/images/item/item-6504933c02731.jpg");
        formData.append('name', product_name.current.value);
        formData.append('description', product_desc.current.value);
        formData.append('allergens', allergens.current.value);
        formData.append('is_avaliable', availability.current.checked);
        formData.append('price', parseFloat(price.current.value));
        */
       const bodydata ={
        id: product.id,
        category_id: category.current.value,
        image: "image.jpg", //az image részt majd meg kell beszélni
        name: product_name.current.value,
        description: product_desc.current.value,
        allergens: allergens.current.value,
        is_avaliable: availability.current.checked ? 1 : 0,
        price: parseFloat(price.current.value)
       } 


        let response = await fetch('http://localhost:8000/termek_valt', {
            method: "POST",
            body: JSON.stringify(bodydata)
        })
        let data = await response.json();
        if(response.ok)
        {
            setUploadStatus("success")
            setResponseMessage("Sikeres adatmódosítás");
        }
        else
        {
            setUploadStatus("danger");
            setResponseMessage(data.valasz);
        }
        
    }

    useEffect(() => {
    fetchCategories();

    const intervalId = setInterval(fetchCategories, refreshInterval);

    return () => clearInterval(intervalId);
    }, [refreshInterval]);
    
    if(product != null)
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
                                <Form.Control type="text" ref={product_name} defaultValue={product.name}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Kategória</Form.Label>
                                <Form.Select ref={category} defaultValue={product.category_id}>
                                
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
                                <Form.Control type="text" ref={product_desc} defaultValue={product.description}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Allergének</Form.Label>
                                <Form.Control type="text" ref={allergens} defaultValue={product.allergens}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check type="checkbox" label="Elérhető" className="checkbox" ref={availability} defaultChecked={Boolean(product.is_avaliable)}></Form.Check>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Ár</Form.Label>
                                <Form.Control type="number" ref={price} defaultValue={product.price}/>
                            </Form.Group>
                        </Form>
                        <Alert variant={uploadstatus}>{responseMessage}</Alert>
                        
                    </Modal.Body>
                    <Modal.Footer>
                    
                    <ActionButton type="cancel" onClick={handleClose}></ActionButton>
                    <ActionButton type="ok" onClick={() => {
                        editProduct();
                    }}></ActionButton>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    return(<></>);
}

export default Editmodal;