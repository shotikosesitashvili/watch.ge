import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Components/Cart";

function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const watch = location.state;

  const validationSchema = Yup.object({
    quantity: Yup.number().required("Quantity is required").min(1, "Minimum quantity is 1"),
  });

  if (!watch) {
    return (
      <div className="product-error">
        <p>Product data not found.</p>
        <button onClick={() => navigate("/")}>Back to Main</button>
      </div>
    );
  }

  const handleAddToCart = (values, { resetForm }) => {
    const product = {
      ...watch,
      id: watch.id ?? watch.name,
      price: Number(String(watch.price).replace(/[^\d.]/g, "")) || 0,
    };

    addToCart(product, values.quantity);
    window.dispatchEvent(new Event("cart:updated"));
    resetForm();
  };

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

          <Formik
            initialValues={{ quantity: 1 }}
            validationSchema={validationSchema}
            onSubmit={handleAddToCart}
          >
            <Form className="add-to-cart-form">
              <div className="quantity-field-group">
                <label htmlFor="quantity">Quantity</label>
                <Field className="detail-quantity-input" id="quantity" name="quantity" type="number" min="1" />
                <ErrorMessage className="form-error-message" name="quantity" component="div" />
              </div>
              <button type="submit" className="add-to-cart-btn">
                ADD TO CART
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;