import { useEffect, useState, useContext } from "react";
import Loading from "../components/Loading";
import axios from 'axios';
import CategoryDiv from "../components/CategoryDiv";
import { Container, Navbar, Nav } from "react-bootstrap";
import ProductToCartModal from "../components/ProductToCartModal";
import CartModal from "../components/CartModal";
import { useParams } from "react-router-dom";
import { AuthContext } from '../Contexts';

export default function UserBufe({isCartShown, cartSet }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSeletdetProduct] = useState(null);
    const [modalShown, setModalShown] = useState(false);
    const [frissits, setFrissits] = useState(false);
    const { bufeId } = useParams();
    const {userData} = useContext(AuthContext);


    useEffect(() => {
        setIsLoading(true);

        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/kategoriak", { params: { bufeId: bufeId } });

                if (response.status === 200) {
                    let data = await response.data.valasz;
                    if (Array.isArray(data)) {
                        setCategories(data);
                    } else {
                        setCategories([]);
                    }
                }
            }
            catch (error) {
                setError('Hiba történt az adatok betöltése közben.');
            }
            finally {
                setIsLoading(false);
            }
        };

        const fetchProduct = async () => {
            try {
                const response = await axios.get("http://localhost:8000/termekek", { params: { place_id: bufeId } });

                if (response.status === 200) {
                    let data = await response.data.valasz;
                    if (Array.isArray(data)) {
                        setProducts(data);
                    } else {
                        setProducts([]);
                    }
                }
            }
            catch (error) {
                setError('Hiba történt az adatok betöltése közben.');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
        fetchProduct();
    }, []);

    const AddToCart = async (q, pid) => {
        try {
            const response = await axios.post("http://localhost:8000/kosarba", {
                "place_id": bufeId,
                "user_id": userData.user_id,
                "quantity": q,
                "product_id": pid
            });

            if (response.status === 200) {
                setFrissits(true);
                setModalShown(false);
            }
        }
        catch (error) {
            setError('Hiba történt a kosárba rakáskor.');
        }
    };

    function openOrderModal(pid) {
        setSeletdetProduct(products.find(p => p.id === pid));
        setModalShown(true);
    }

    return (
        <>
            {isLoading && <Loading />}
            {error && <div className="error-message">{error}</div>}

            <Navbar sticky="top" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            {categories.filter(c => parseInt(c.deleted) === 0).map((c) =>
                                <Nav.Link key={c.id} href={"#" + c.categroy_name}>{c.categroy_name}</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container id="categories_container">
                {categories.filter(c => parseInt(c.deleted) === 0).map((c) =>
                    <CategoryDiv key={c.id} catId={c.id} catNev={c.categroy_name} termekek={products} buttonActions={openOrderModal} />
                )}
            </Container>

            <ProductToCartModal isOpen={modalShown} product={selectedProduct} onClose={() => { setModalShown(false) }} addToCart={AddToCart} />
            <CartModal userData={userData} bufeId={bufeId} isShown={isCartShown} onClose={() => { cartSet(false) }} stopFrissit={() => { setFrissits(false) }} frissits={frissits} />
        </>
    );
}
