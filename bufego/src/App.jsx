import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import NoPage from "./pages/NoPage";
import AdminRoute from "./AdminRoute";
import LoginRoute from "./LoginRoute";
import { AdminProvider, AuthContext, AuthProvider } from "./Contexts";

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
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Settings from "./pages/Settings";
import { useNavigate } from 'react-router-dom'
import Aszf from "./pages/ASZF";
import Impresszum from "./pages/Impresszum";
import Gyik from "./pages/GYIK";
import Kapcsolat from "./pages/Kapcsolat";
import AdatkezelesiTajekoztato from "./pages/Adatkezeles";
import ForbiddenPage from "./pages/ForbiddenPage";
import Rolunk from "./pages/Rolunk";
import Logout from "./pages/Logout";

function App() {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <AdminProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AdminNavbar />
            <Navigation cartClickAction={() => { setCartOpen(true) }} />
            <div className="container mt-4" style={{ flex: 1 }}>
              <Routes>
                <Route>
                  <Route index element={<Landing />} />
                  <Route path="/home" element={<LoginRoute><Home /></LoginRoute>} />
                  <Route path="/home/bufe/:bufeId" element={<LoginRoute><UserBufe isCartShown={isCartOpen} cartSet={setCartOpen} /></LoginRoute>} />
                  <Route path="/home/myorders" element={<LoginRoute><OrdersPage /></LoginRoute>} />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <AdminRoute requireBuffet={true}>
                      <AdminOrders />
                    </AdminRoute>} />
                  <Route path="/admin/statistics" element={
                    <AdminRoute requireBuffet={true}>
                      <AdminStats />
                    </AdminRoute>} />
                  <Route path="/admin/products" element={
                    <AdminRoute requireBuffet={true}>
                      <AdminProducts />
                    </AdminRoute>} />
                  <Route path="/admin/categories" element={
                    <AdminRoute requireBuffet={true}>
                      <AdminCategories />
                    </AdminRoute>} />
                  <Route path="/admin/reviews" element={
                    <AdminRoute requireBuffet={true}>
                      <AdminReviews />
                    </AdminRoute>} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/aszf" element={<Aszf/>}/>
                  <Route path="/impressum" element={<Impresszum/>}/>
                  <Route path="/adatkezelesi-tajekoztato" element={<AdatkezelesiTajekoztato/>}/>
                  <Route path="/gyik" element={<Gyik/>}/>
                  <Route path="/kapcsolat" element={<Kapcsolat/>}/>
                  <Route path="/rolunk" element={<Rolunk/>}/>
                  <Route path="/forbidden" element={<ForbiddenPage/>}/>
                  <Route path="/logout" element={<Logout/>}/>
                  <Route path="*" element={< NoPage />} />
                </Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
