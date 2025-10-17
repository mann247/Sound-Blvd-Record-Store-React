import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.js';
import Products from './pages/Products.js';
import Contact from './pages/Contact.js';


export default function App(){
return (
  <div className="sb-shell">
    <Nav />
        <div className="sb-content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
        </div>
    <Footer />
  </div>
  );
}