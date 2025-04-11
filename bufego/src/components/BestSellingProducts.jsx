import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../styles/Stats.css"
import ProductCard from '../components/ProductCard';

function BestSellingProducts({ bufeId }) {
  const d = new Date();


  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [years, setYears] = useState(null);
  const selectedyear = useRef(0);
  const refreshInterval = 5000;

  useEffect(() => {
    if (years?.length > 0 && selectedyear.current.value == 0) {
      selectedyear.current.value = years[0].ev;
      fetchProducts();
    }
  }, [years]);


  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    if(selectedyear.current.value != 0 && selectedyear.current.value != undefined)
    {
      console.log(selectedyear.current.value)
      try {
        const response = await axios.get('./api/index.php/legjobbanfogyo', {
          params: {
            place_id: bufeId,
            year: selectedyear.current.value
          },
        });
        if (response.data.valasz == "Nincsenek találatok!") {
          return (<h1>Nincsenek találatok</h1>)
        }
  
        setProducts(response.data.valasz);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchYears = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('./api/index.php/eveklekerorders', {
        params: { place_id: bufeId},
      });
      setYears(response.data.valasz)

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchYears();

    const intervalId = setInterval(()=>{fetchProducts(); fetchYears()}, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  if(years != null)
  {
    return (
      <>
        {error && <div className="text-danger">Hiba: {error}</div>}
    
        <select style={{ maxWidth: 300, margin: 'auto' }} onChange={fetchProducts} ref={selectedyear}>
          <option value={0}>Válasszon ki egy évet</option>
          {Array.isArray(years) && years.length > 0 && (
            years.map((i) => (
          <option key={i.ev} value={i.ev}>{i.ev}</option>
          )))}
        </select>
    
        <div className="products-grid mt-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} forStat={true} />
          ))}
        </div>
      </>
    );
  }
  else
  {
    return(<>Betöltés...</>)
  }
}

export default BestSellingProducts;