import React, { useState, useEffect,useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ProductUploadForm from '../components/ProductUploadForm';
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
    setError(null);
    try {
      const response = await fetch('./api/index.php/termekek?place_id=' + adminBufe.id);
      let data = await response.json();
      if (Array.isArray(data.valasz)) {
        setProducts(data.valasz);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();

    const intervalId = setInterval(fetchProducts, refreshInterval);

    return () => clearInterval(intervalId);
  }, [adminBufe]);

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
      <Editmodal show={show} handleClose={handleClose} product={selected}></Editmodal>
      <ProductUploadForm></ProductUploadForm>
    </div>
  );
};

export default Products;