import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/layout';
import Home from './pages/home';
import Landing from './pages/landing';
import Admin from './pages/Admin';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}/>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
