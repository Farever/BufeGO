import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import axios from 'axios';
import CategoryDiv from "../components/CategoryDiv";
import { Container } from "react-bootstrap";

export default function UserBufe()
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    
    useEffect(() =>
    {
        setIsLoading(true);

        const fetchCategories = async () =>
        {
            try
            {
                const response = await axios.get("http://localhost:8000/kategoriak", {params : {bufeId : "1"}});

                if(response.status == 200)
                {
                    let data = await response.data.valasz;
                    setCategories(data);
                }

            } 
            catch (error) 
            {
                setError('Hiba történt az adatok betöltése közben.');
            } 
            finally 
            {
                setIsLoading(false);
            }
        }   

        const fetchProduct = async () => {
            try
            {
                const response = await axios.get("http://localhost:8000/termekek", {params : {place_id : "1"}});

                if(response.status == 200)
                {
                    let data = await response.data.valasz;
                    setProducts(data);
                }

            } 
            catch (error) 
            {
                setError('Hiba történt az adatok betöltése közben.');
            } 
            finally 
            {
                setIsLoading(false);
            }
        }
        fetchCategories();
        fetchProduct();
    }, [])

    return(
        <>     
            {isLoading && <Loading />}
            {error && <div className="error-message">{error}</div>}
            <Container>
                <nav>
                    <ul>
                        {categories.filter(c => c.deleted == 0).map((c) => 
                            <li key={c.id}><a href={"#"+c.categroy_name}>{c.categroy_name}</a></li>
                        )}
                    </ul>
                </nav>
                {categories.map((c) => 
                    <CategoryDiv key={c.id} catId={c.id} catNev={c.categroy_name} termekek={products}/>
                )}
            </Container>
        </>
    )
}