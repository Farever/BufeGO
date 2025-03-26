import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import NoPage from "./pages/NoPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import './styles/App.css'
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminStats from "./pages/AdminStats";
import AdminCategories from "./pages/AdminCategories";
import AdminReviews from "./pages/AdminReviews";
import Navigation from "./components/UserNavBar";
import UserBufe from "./pages/UserBufe";
import OrdersPage from "./pages/Orders";
import { useEffect, useState } from "react";
import axios from "axios";
import Settings from "./pages/Settings";

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [bejelentkezes, setBejelentkezes] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  useEffect(()=>{
    const getUser = async () => {
      try{
        const response = axios.get("http://localhost:8000/bejelentkezescookieleker");

        if((await response).status == 200)
        {
          setUserProfile((await response).data)
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }
  },bejelentkezes)


  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AdminNavbar />
        <Navigation cartClickAction={()=>{setCartOpen(true)}}/>
        <div className="container mt-4" style={{ flex: 1 }}>
          <Routes>
            <Route>
              <Route index element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/bufe/:bufeId" element={<UserBufe isCartShown={isCartOpen} cartSet={setCartOpen} userData={userProfile}/>} />
              <Route path="/home/myorders" element={<OrdersPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/statistics" element={<AdminStats />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={< NoPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
