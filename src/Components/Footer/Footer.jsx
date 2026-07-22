import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { 
  faFacebookF, 
  faInstagram, 
  faLinkedinIn, 
  faYoutube 
} from "@fortawesome/free-brands-svg-icons"; 

function Footer() {
  const handleSubmit = (e) => {

    e.preventDefault();
    

  };

  return (
  
    <footer id="footer" className="footer">

      <div className="footer-top">
        
        <div className="footer-brand">
          <h2>WATCH.GE</h2>
          <span>LUXURY BOUTIQUE</span>

          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="footer-badge">OFFICIAL RETAILER</div>
          
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>NAVIGATION</h4>

          <Link to="/">MAIN</Link>
          <Link to="/watches">WATCHES</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>

        </div>

        <div className="footer-newsletter">
          <h4>NEWSLETTER</h4>
          <p>lore ipsum dolor sit amet</p>
          <form onSubmit={handleSubmit}>

            <input type="email" placeholder="Enter your email" required />

            <button type="submit" aria-label="Subscribe">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>

          </form>

        </div>

      </div>

      <div className="footer-bottom">

        <p>© ALL RIGHTS RESERVED.</p>
        <div className="footer-bottom-links">

          <a href="#privacy">PRIVACY POLICY</a>

          <a href="#terms">TERMS OF SERVICE</a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;