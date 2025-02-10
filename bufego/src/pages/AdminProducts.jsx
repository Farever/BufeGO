import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import data from '../data.json';
import ActionButton from '../components/ActionButton';
import ProductUploadForm from '../components/ProductUploadForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulált API hívás a lokális JSON adatbázisból
        const response = { data: data.products };
        setProducts(response.data);
      } catch (error) {
        setError('Hiba történt az adatok betöltése közben.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Termékek</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ProductUploadForm></ProductUploadForm>
    </div>
  );
};

export default Products;