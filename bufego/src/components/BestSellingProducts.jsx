import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Card, Col } from 'react-bootstrap';

function BestSellingProducts()
{
    const d = new Date();
    

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const refreshInterval = 5000; // Alapértelmezett frissítési idő 5 másodperc


    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get('http://localhost/13c-vegh/api/index2.php/legjobbanfogyo', {
            params: { "place_id": 1,
                "year": d.getFullYear(),
                "month": d.getMonth()
            },
          });
          console.log(response.data.valasz)
          if(response.data.valasz == "Nincsenek találatok!")
          {
            return
          }
    
          setProducts(response.data.valasz);  // Update state with the formatted data
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
        <>
            {products.map((product, index) => (
            <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
                <ProductCard product={product}></ProductCard>
            </div>
          ))}
        </>
      );
}

export default BestSellingProducts;