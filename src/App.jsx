import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Cookies } from "./Components/Cookies";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import ProductPage from "./Pages/ProductPage";
import { CartProvider } from "./Components/Cart";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <Footer />
          <Cookies />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;