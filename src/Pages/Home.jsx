import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PromoBanner from "../Components/PromoBanner";
import InfoSections from "../Components/InfoSections";
import ContactCards from "../Components/ContactCards";

function Home() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("https://dummyjson.com/products/search?q=watch");
        const data = await response.json();
        
        const limitedData = data.products.slice(0, 8).map((item) => ({
          id: item.id,
          name: item.title,
          price: `$${item.price}`,
          tag: item.brand ? item.brand.toUpperCase() : "WATCH",
          description: item.description,
          img: item.thumbnail,
          sale: item.discountPercentage > 12
        }));

        setWatches(limitedData);
      } catch (error) {
        console.error("Error fetching items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);



  return (
    <main>
      <section id="new-collection" className="collection-section">
        <div className="collection-header">
          <h2>EXQUISITE TIMEPIECES</h2>
        </div>
        <div className="products-grid">
          {watches.map((watch) => (
            <div 
              key={watch.id} 
              className="product-card" 
              onClick={() => navigate(`/product/${watch.id}`, { state: watch })}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-image-wrapper">
                {watch.sale && <span className="sale-badge">SALE</span>}
                <img src={watch.img} alt={watch.name} />
              </div>
              <div className="card-info">
                <span className="product-tag">{watch.tag}</span>
                <h3 className="product-name">{watch.name}</h3>
                <p className="product-price">{watch.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PromoBanner />
      <InfoSections />
      <ContactCards />
    </main>
  );
}

export default Home;