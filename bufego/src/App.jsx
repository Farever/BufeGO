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
import { useNavigate } from 'react-router-dom'

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  
  const getUser = async() =>
  {
    try {
      let resp = await fetch("http://localhost:8000/sessdata", {
        credentials: "include"
      });
      if(resp.ok)
      {
        let data = await resp.json()
        setUserProfile(data.valasz);
      }
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AdminNavbar />
        <Navigation cartClickAction={()=>{setCartOpen(true)}}/>
        <div className="container mt-4" style={{ flex: 1 }}>
          <Routes>
            <Route>
              <Route index element={<Landing setLoggedinUser={setUserProfile}/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/bufe/:bufeId" element={<UserBufe userData={userProfile} isCartShown={isCartOpen} cartSet={setCartOpen}  getUser={getUser}/>} />
              <Route path="/home/myorders" element={<OrdersPage />} />
              <Route path="/admin" element={<Admin userData/>} />
              <Route path="/admin/orders" element={<AdminOrders getUser={getUser}/>} />
              <Route path="/admin/statistics" element={<AdminStats getUser={getUser}/>} />
              <Route path="/admin/products" element={<AdminProducts getUser={getUser}/>} />
              <Route path="/admin/categories" element={<AdminCategories getUser={getUser}/>} />
              <Route path="/admin/reviews" element={<AdminReviews getUser={getUser}/>} />
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
