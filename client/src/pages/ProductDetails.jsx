import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
        setLoading(false);
      });
  }, [id]);

  const addToCart = async () => {
    try {
      setAdding(true);

      const response = await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId: product.id,
        }
      );

      localStorage.setItem(
        "campusCart",
        JSON.stringify(response.data.cart)
      );

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Add to cart error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to add product to cart."
      );
    } finally {
      setAdding(false);
    }
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
              disabled={adding}
            >
              {adding
                ? "Adding..."
                : "🛒 Add to Cart"}
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