import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { useCart } from "./Cart";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();

  const navItems = [
    { path: "/", label: "Main" },
    { path: "/watches", label: "Watches" },
    { path: "/#info-sections", label: "About", targetId: "info-sections" },
    { path: "/#ContactCards", label: "Contact", targetId: "contact-cards" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleCartUpdated = () => setIsCartOpen(true);
    window.addEventListener("cart:updated", handleCartUpdated);
    return () => window.removeEventListener("cart:updated", handleCartUpdated);
  }, []);

  const handleNavClick = (e, item) => {
    if (item.targetId) {
        e.preventDefault();

        if (location.pathname === "/") {
          const element = document.getElementById(item.targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
          window.history.pushState(null, "", item.path);
        } else {
          navigate(item.path);
        }
      } else {
        navigate(item.path);
      }
    };
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <header className={`app-header ${isScrolled ? "scrolled" : "transparent"}`}>
      <div className="header-container">
        <Link
          to="/"
          className="logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="logo-text">WATCH.GE</span>
          <span className="logo-subtext">LUXURY BOUTIQUE</span>
        </Link>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                if (item.targetId) {
                  return location.hash === `#${item.targetId}` ? "nav-link active" : "nav-link";
                }
                return isActive && location.hash === "" ? "nav-link active" : "nav-link";
              }}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a href="tel:599999999" className="phone-link">
            <span className="phone-number">599 99 99 99</span>
          </a>

          <button
            className="cart-toggle-btn"
            onClick={() => setIsCartOpen((prev) => !prev)}
            aria-label="Toggle cart"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-count">{cartCount}</span>
          </button>

          <Link to="/register" className="register-nav-btn">
            REGISTER
          </Link>

          <button className="appoint-btn">BOOK VIEWING</button>
        </div>
      </div>

      {isCartOpen && (
        <div className="cart-dropdown">
          <div className="cart-dropdown-header">
            <h3>Your Cart</h3>
            <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
              ×
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-meta">{item.tag}</p>
                      <p className="cart-item-meta">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="cart-item-actions">
                      <button className="cart-quantity-btn" onClick={() => updateQuantity(item.id, -1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button className="cart-quantity-btn" onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                      <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-dropdown-footer">
                <span>Total</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;