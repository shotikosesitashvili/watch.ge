import { useEffect, useState } from "react";

function NewCollection() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=8");
        const data = await res.json();

        const formatted = data.products.map((item) => ({
          id: item.id,
          name: item.title,
          price: `$${item.price}`,
          tag: item.brand || "LUXURY",

          img: `https://picsum.photos/300/300?random=${item.id}`,

          sale: item.discountPercentage > 10,
        }));

        setWatches(formatted);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section id="new-collection" className="collection-section">
      <div className="hero-top-buttons">
        <div className="hero-top-content">
          <p className="hero-subtitle">DISCOVER EXCLUSIVE WATCHES</p>
          <h2>Elevate Your Style With Timeless Luxury</h2>
        </div>
        <div className="hero-button-group">
          <button className="hero-btn primary">Explore Collection</button>
          <button className="hero-btn secondary">Best Sellers</button>
          <button className="hero-btn tertiary">New Arrivals</button>
        </div>
      </div>

      <div className="collection-header">
        <h2>NEW COLLECTION</h2>
        <span className="see-all">See All</span>
      </div>

      <div className="products-grid">
        {watches.map((watch) => (
          <div key={watch.id} className="product-card">
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
  );
}

export default NewCollection;