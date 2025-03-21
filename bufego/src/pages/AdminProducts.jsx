import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ActionButton from '../components/ActionButton';
import ProductUploadForm from '../components/ProductUploadForm';
import axios from 'axios';
import Editmodal from '../components/Editmodal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc
  let place_id = 1;

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleClose = () => {setShow(false)};
  const handleShow = (product) => {
    setShow(true);
    setSelected(product);
  };

  const fetchProducts = async () => {
    console.log("asd")
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/termekek?place_id='+place_id);

      let data = await response.json();
      setProducts(data.valasz);  // Update state with the formatted data
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchProducts(); // Az első lekérdezés a komponens mountolásakor

    const intervalId = setInterval(fetchProducts, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, [refreshInterval]); // dependency arra az esetre ha megváltoztatnánk, de alapvetően az 5 mp marad

  return (
    <div>
      <h2>Termékek</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} handleShow={handleShow}/>
        ))}
      </div>
      <Editmodal show={show} handleClose={handleClose} product={selected}></Editmodal> {/*A productcard-ba be kell tenni az editmodal-ban levő modal megnyitó függvényt */}
      <ProductUploadForm></ProductUploadForm>
    </div>
  );
};

export default Products;