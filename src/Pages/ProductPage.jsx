import { useLocation, useNavigate } from "react-router-dom";

function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const watch = location.state; 

  if (!watch) {
    return (
      <div className="product-error">
        <p>Product data not found.</p>
        <button onClick={() => navigate("/")}>Back to Main</button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="detail-image-side">
          <img src={watch.img} alt={watch.name} />
        </div>
        <div className="detail-info-side">

          <span className="detail-brand">{watch.tag}</span>

          <h1 className="detail-title">{watch.name}</h1>


          <p className="detail-price">{watch.price}</p>

          <div className="detail-divider"></div>

          <p className="detail-description">{watch.description}</p>
          
          <button className="add-to-cart-btn">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;