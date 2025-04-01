import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import NoPage from "./pages/NoPage";
import AdminRoute from "./AdminRoute";
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
import LoginRoute from "./LoginRoute";

function App() {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route path="*" element={
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navigation cartClickAction={() => setCartOpen(true)} />
                <AdminNavbar />
                <div className="container mt-4" style={{ flex: 1 }}>
                  <Routes>
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
                    <Route path="*" element={< NoPage />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            } />
          </Routes>
        </Router>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
