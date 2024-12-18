import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import data from '../data.json';
import { Button } from 'react-bootstrap';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulált API hívás a lokális JSON adatbázisból
        const response = { data: data.categories };
        setCategories(response.data);
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
      <h2>Kategóriák</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <span className="category-name">{category.name}</span>
            <div className="category-actions">
              <Button variant="primary" size="sm">
                Módosítás
              </Button>
              <Button variant="danger" size="sm">
                <i className="fas fa-trash-alt"></i>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;