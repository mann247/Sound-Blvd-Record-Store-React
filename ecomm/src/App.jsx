import {Routes, Route} from "react-router-dom"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Shop from "./pages/Shop.jsx"
import Contact from "./pages/Contact.jsx"
import './App.css'

function App() {
  return (
      <div className="app-layout">
            <Header />

            <main>
              <Routes>
                  <Route path ="/" element={<Home />} />
                  <Route path ="/Shop" element={<Shop />} />
                  <Route path ="/Contact" element={<Contact />} />
              </Routes>
              </main>

            <Footer />
      </div>
    );
}

export default App
