import React, { useState, useEffect, useContext } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CategoryCard from '../components/CategoryCard';
import CategoryModal from '../components/CategoryModal';
import { AdminBufeContext } from '../Contexts';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalShown, setModalShown] = useState(false);
  const [modalType, setModalType] = useState("mod");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const {adminBufe} = useContext(AdminBufeContext);

  useEffect(() => {
    fetchData();
  }, [adminBufe]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/kategoriak", {
        params: { bufeId: adminBufe.id }
      });
  
      if (response.status === 200) {
        const data = response.data.valasz;
  
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      } else {
        setError("Hiba történt az adatok lekérése közben.");
      }
    } catch (error) {
      console.error(error);
      setError("Hiba történt az adatok betöltése közben.");
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  function reszletekButtonClicked(id)
  {
      setSelectedCategory(categories.find(c => c.id == id));
      setModalType("mod");
      setModalShown(true)
  }

  function ujButtonClicked()
  {
      setSelectedCategory({"id" : -1, 'categroy_name' : "Új kategória"});
      setModalType("uj");
      setModalShown(true);
  }

  const updateCategory = async (id, nev, hely) => {
    try
    {
      let response = axios.post("http://localhost:8000/kategoriamodositas", {
        "katId": parseInt(id),
        "katName" : nev,
        "katHely" : parseInt(hely)
      })

      let data = (await response).data;
      alert(data['valasz']);
      fetchData();
      location.reload();
     }
    catch(error)
    {
      alert(error);
    }
  }

  const newCategory = async (id, nev, hely) => {
    try
    {
      let response = axios.put("http://localhost:8000/kategoriafeltoltes", {
        "bufeId": adminBufe.id,
        "katName" : nev,
        "katHely" : parseInt(hely)
      })

      let data = (await response).data;
      fetchData();
      setModalShown(false);
    }
    catch(error)
    {
      alert(error);
    }
  }

  function deleteButtonPropmt(id)
  {
    let mehet = confirm("Biztosan törli ezt a kategóriát?");

    if(mehet)
    {
      deleteCategory(id);
    }
  }

  const deleteCategory = async (id) =>
  {
    try
    {
      let response = axios.delete("http://localhost:8000/kategoriatorles", {
       params : {"katId" : id}
      })

      let data = (await response).data;
      alert(data['valasz']);
      fetchData();
      setModalShown(false);
    }
    catch(error)
    {
      alert(error);
    }
  }

  return (
    <div>
      <h2>Kategóriák</h2>
      {isLoading && <Loading />}
      {error && <div className="error-message">{error}</div>}
      <div className="categories-grid">
        {categories.filter(c => c.deleted == 0).map((c) =>
          <CategoryCard
            key={c.id}
            id={c.id}
            nev={c.categroy_name}
            reszletek={()=>{reszletekButtonClicked(c.id)}}
          />
        )}
      </div>
      <hr/>
      <Button type='button' variant='success' onClick={ujButtonClicked}>Új kategória létrehozása</Button>
      {<CategoryModal bufeId={adminBufe.id} type={modalType} isOpen={modalShown} categoryDetails={selectedCategory} save={modalType =="mod" ? updateCategory : newCategory} del={deleteButtonPropmt} onClose={()=> {setModalShown(false); fetchData()}}/>}
    </div>
  );
};

export default Categories;