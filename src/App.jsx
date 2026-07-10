import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Cookies } from "./Components/Cookies";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import ProductPage from "./Pages/ProductPage";
import Watches from "./Pages/Watches";
import { CartProvider } from "./Components/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watches" element={<Watches />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <Footer />
          <Cookies />
          <button
            type="button"
            className={`scroll-up-btn ${showScrollUp ? "visible" : "hidden"}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;