import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Watches() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products/search?q=watch&limit=50");
        const data = await response.json();
        const products = Array.isArray(data.products) ? data.products : [];

        const formatted = products.map((item) => {
          const price = Number(item.price) || 0;
          const discount = Number(item.discountPercentage) || 0;
          const oldPrice = discount > 0 ? Math.round(price / (1 - discount / 100) * 100) / 100 : price;

          return {
            id: item.id,
            name: item.title,
            price: price,
            oldPrice,
            tag: item.brand ? item.brand.toUpperCase() : "LUXURY",
            description: item.description,
            img: item.thumbnail,
            sale: discount > 0,
            brand: item.brand || "Unknown",
          };
        });

        setWatches(formatted);
      } catch (error) {
        console.error("Error fetching watches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBrand, sortBy]);

  const brands = useMemo(() => ["All", ...new Set(watches.map((watch) => watch.brand))], [watches]);

  const filteredWatches = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const result = watches.filter((watch) => {
      const matchesQuery =
        !query ||
        watch.name.toLowerCase().includes(query) ||
        watch.description.toLowerCase().includes(query) ||
        watch.tag.toLowerCase().includes(query) ||
        watch.brand.toLowerCase().includes(query);

      const matchesBrand = selectedBrand === "All" || watch.brand === selectedBrand;
      return matchesQuery && matchesBrand;
    });

    switch (sortBy) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [watches, searchTerm, selectedBrand, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredWatches.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedWatches = filteredWatches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <main className="page-padding-top watches-page">
      <section className="collection-section">
        <div className="hero-top-buttons">
          <div className="hero-top-content">
            <p className="hero-subtitle">DISCOVER EXCLUSIVE WATCHES</p>
            <h2>Find Your Signature Timepiece</h2>
          </div>
        </div>

        <div className="watches-toolbar">
          <label className="watches-search">
            <span>Search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, brand or style"
            />
          </label>

          <label className="watches-filter">
            <span>Brand</span>
            <select value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)}>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </label>

          <label className="watches-filter">
            <span>Sort</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>

        <div className="collection-header">
          <h2>ALL WATCHES</h2>
          <span className="see-all">{filteredWatches.length} items</span>
        </div>

        {loading ? (
          <p className="watches-empty">Loading watches...</p>
        ) : filteredWatches.length === 0 ? (
          <p className="watches-empty">No watches match your search.</p>
        ) : (
          <div className="products-grid">
            {paginatedWatches.map((watch) => (
              <div
                key={watch.id}
                className="product-card"
                onClick={() => navigate(`/product/${watch.id}`, { state: watch })}
                style={{ cursor: "pointer" }}
              >
                <div className="card-image-wrapper">
                  {watch.sale && <span className="sale-badge">SALE</span>}
                  <img src={watch.img} alt={watch.name} />
                </div>
                <div className="card-info">
                  <span className="product-tag">{watch.tag}</span>
                  <h3 className="product-name">{watch.name}</h3>
                  <div className="price-row">
                    <p className="product-price">${watch.price.toFixed(2)}</p>
                    {watch.sale && <p className="old-price">${watch.oldPrice.toFixed(2)}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredWatches.length > 0 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`page-btn ${pageNumber === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Watches;
