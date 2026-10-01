import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error loading product:",
          error
        );
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const existingCart =
      JSON.parse(
        localStorage.getItem("campusCart")
      ) || [];

    existingCart.push(product);

    localStorage.setItem(
      "campusCart",
      JSON.stringify(existingCart)
    );

    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="loading">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-box">
        <h2>Product not found</h2>

        <button
          className="primary-button"
          onClick={() => navigate("/shop")}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <button
        className="back-button"
        onClick={() => navigate("/shop")}
      >
        ← Back to Shop
      </button>

      <div className="product-details-card">
        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-info">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-details-price">
            ₹{product.price}
          </div>

          <p className="product-details-note">
            ✓ Suitable for college students
            <br />
            ✓ Student-friendly product
            <br />
            ✓ Easy campus shopping
          </p>

          <div className="product-details-actions">
            <button
              className="add-button"
              onClick={addToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/cart")}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;