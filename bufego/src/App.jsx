import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/home';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import NoPage from "./pages/NoPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css'
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminStats from "./pages/AdminStats";
import AdminCategories from "./pages/AdminCategories";
import AdminReviews from "./pages/AdminReviews";

function App() {
  return (
    <BrowserRouter>
      <AdminNavbar />
      <Routes>
        <Route>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/statistics" element={<AdminStats />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="*" element={< NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
