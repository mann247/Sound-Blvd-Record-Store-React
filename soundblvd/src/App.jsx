// import logo from './logo.svg';
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Contact from "./pages/Contact.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {Routes, Route} from "react-router-dom";
import './App.css';



export default function App() {
  return (
    <div>
          <Header />
            <Routes>
                <Route path ="/" element={<Home />} />
                <Route path ="/Shop" element={<Shop />} />
                <Route path ="/Contact" element={<Contact />} />
            </Routes>
          <Footer />
    </div>
  );
}
