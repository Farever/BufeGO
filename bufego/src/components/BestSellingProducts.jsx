import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Stats.css"
import { Card, Col } from 'react-bootstrap';

function BestSellingProducts({bufeId})
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
          const response = await axios.get('./api/index.php/legjobbanfogyo', {
            params: { 
                place_id: bufeId,
                year: d.getFullYear(),
                month: 1
            },
          });
          if(response.data.valasz == "Nincsenek találatok!")
          {
            return(<h1>Nincsenek találatok</h1>)
          }
    
          setProducts(response.data.valasz);  // Update state with the formatted data
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
            {products.map((product, index) => (
            <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
                <div className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <h5 className="">{product.name}</h5>
                    <p className="product-info">Ár: {product.price} Ft</p>
                    <p className="product-info">Kategória: {product.category}</p>
                  </div>
                </div>
            </div>
          ))}
        </>
      );
}

export default BestSellingProducts;