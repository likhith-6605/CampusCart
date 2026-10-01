import { Link } from "react-router-dom";
import axios from "axios";

function ProductCard({ product }) {
  const addToCart = async () => {
    try {
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
    }
  };

  const addToWishlist = () => {
    const existingWishlist =
      JSON.parse(localStorage.getItem("campusWishlist")) || [];

    const alreadyExists = existingWishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      alert("Product is already in your wishlist.");
      return;
    }

    existingWishlist.push(product);

    localStorage.setItem(
      "campusWishlist",
      JSON.stringify(existingWishlist)
    );

    alert(`${product.name} added to wishlist!`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-bottom">
          <strong>₹{product.price}</strong>

          <div className="product-buttons">
            <button
              className="wishlist-small"
              onClick={addToWishlist}
              title="Add to Wishlist"
            >
              ♡
            </button>

            <button
              className="add-button"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="view-details-button"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;