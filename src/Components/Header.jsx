import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Main" },
    { path: "/#new-collection", label: "Watches", targetId: "new-collection" },
    { path: "/#info-sections", label: "About", targetId: "info-sections" }, 
    { path: "/#ContactCards", label: "Contact", targetId: "contact-cards" }, 
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    if (item.targetId) {
      e.preventDefault(); 
      setIsMenuOpen(false); 

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
      setIsMenuOpen(false);
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
            599 99 99 99
          </a>
          
          <Link to="/register" className="register-nav-btn">
            REGISTER
          </Link>

          <button className="appoint-btn">BOOK VIEWING</button>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? "open" : ""}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
          </button>
        </div>

      </div>

      {isMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </NavLink>
            ))}
            
            <Link 
              to="/register" 
              className="mobile-nav-link register-mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Register / Sign Up
            </Link>
          </nav>
          <div className="drawer-divider"></div>
          <button className="mobile-appoint-btn">BOOK VIEWING</button>
        </div>
      )}
    </header>
  );
}

export default Header;