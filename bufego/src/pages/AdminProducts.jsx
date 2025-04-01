import React, { useState, useEffect,useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ActionButton from '../components/ActionButton';
import ProductUploadForm from '../components/ProductUploadForm';
import axios from 'axios';
import Editmodal from '../components/Editmodal';
import { AdminBufeContext } from '../Contexts';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc
  const {adminBufe} = useContext(AdminBufeContext);


  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleClose = () => { setShow(false) };
  const handleShow = (product) => {
    setShow(true);
    setSelected(product);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost/api/index.php/termekek?place_id=' + adminBufe.id);
      let data = await response.json();
      
      // Ellenőrizzük, hogy a válasz tartalmaz-e egy tömböt
      if (Array.isArray(data.valasz)) {
        setProducts(data.valasz);
      } else {
        setProducts([]); // Ha nem tömb, állítsuk üres tömbre, hogy elkerüljük a hibát
      }
    } catch (err) {
      setError(err.message);
      setProducts([]); // Hiba esetén is állítsuk üres tömbre
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts(); // Az első lekérdezés a komponens mountolásakor

    const intervalId = setInterval(fetchProducts, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, [adminBufe]); // dependency arra az esetre ha megváltoztatnánk, de alapvetően az 5 mp marad

  return (
    <div>
      <h2>Termékek</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="products-grid">
        {(products.length > 0) ? 
          products.map((product) => (
            <ProductCard key={product.id} product={product} handleShow={handleShow} />
          )) :  (<></>)}
      </div>
      <Editmodal show={show} handleClose={handleClose} product={selected}></Editmodal> {/*A productcard-ba be kell tenni az editmodal-ban levő modal megnyitó függvényt */}
      <ProductUploadForm></ProductUploadForm>
    </div>
  );
};

export default Products;