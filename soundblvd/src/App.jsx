// import logo from './logo.svg';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";

import Header from "./components/Header";
import Footer from "./components/Footer";
import {Routes, Route} from "react-router-dom";
import './App.css';



function App() {
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

export default App;
