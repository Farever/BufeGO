import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import data from '../data.json';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CategoryCard from '../components/CategoryCard';
import CategoryModal from '../components/CategoryModal';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalShown, setModalShown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get("http://localhost:8000/kategoriak", {params : {bufeId : "1"}});

          if(response.status == 200)
          {
            console.log(response);
            let data = await response.data.valasz;
            setCategories(data);
          }
      } catch (error) {
        setError('Hiba történt az adatok betöltése közben.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function reszletekButtonClicked(id)
  {
      setSelectedCategory(categories.find(c => c.id == id));
      setModalShown(true)
  }

  const updateCategory = async () => {
    try
    {
      let response = axios.post()
    }
    catch(error)
    {

    }
  }

  return (
    <div>
      <h2>Kategóriák</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="categories-grid">
        {categories.map((c) => 
          <CategoryCard
            key={c.id}
            id={c.id}
            nev={c.categroy_name}
            reszletek={()=>{reszletekButtonClicked(c.id)}}
          />
        )}
      </div>

      {<CategoryModal isOpen={modalShown} categoryDetails={selectedCategory} onClose={()=> setModalShown(false)}/>}
    </div>
  );
};

export default Categories;