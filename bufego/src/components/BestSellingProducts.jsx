import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Stats.css"
import ProductCard from '../components/ProductCard';

function BestSellingProducts({ bufeId }) {
  const d = new Date();


  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc


  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/legjobbanfogyo', {
        params: {
          place_id: bufeId,
          year: d.getFullYear(),
          month: d.getMonth() + 1
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

  useEffect(() => {
    fetchProducts(); // Az első lekérdezés a komponens mountolásakor

    const intervalId = setInterval(fetchProducts, refreshInterval); // Lekérdezés a beállított időközönként

    return () => clearInterval(intervalId); // Az intervallum törlése a komponens unmountolásakor
  }, [refreshInterval]); // dependency arra az esetre ha megváltoztatnánk, de alapvetően az 5 mp marad


  return (
    <>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} forStat={true} />
        ))}
      </div>
    </>
  );
}

export default BestSellingProducts;