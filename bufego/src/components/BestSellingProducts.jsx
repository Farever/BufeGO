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
  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc


  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/legjobbanfogyo', {
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
  };

  const fetchYears = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/eveklekerorders', {
        params: { place_id: bufeId},
      });
      console.log(response.data.valasz);
      setYears(response.data.valasz)

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Az első lekérdezés a komponens mountolásakor
    fetchYears();

    const intervalId = setInterval(()=>{fetchProducts(); fetchYears()}, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, [refreshInterval]); // dependency arra az esetre ha megváltoztatnánk, de alapvetően az 5 mp marad

  if(years != null)
  {
    return (
      <>
        <select onChange={fetchProducts} ref={selectedyear}>
          <option value={0}>Válasszon ki egy évet</option>
          {years.map((i) => (
          <option key={i.ev} value={i.ev}>{i.ev}</option>
          ))}
        </select>
        <div className="products-grid mt-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} forStat={true} />
          ))}
        </div>
      </>
    );
  }
  else
  {
    return(<>Loading...</>)
  }
}

export default BestSellingProducts;