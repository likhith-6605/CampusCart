import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cart"
      );

      setCart(response.data.cart);

      localStorage.setItem(
        "campusCart",
        JSON.stringify(response.data.cart)
      );
    } catch (error) {
      console.error("Cart loading error:", error);

      alert(
        "Unable to load cart from the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${productId}`
      );

      setCart(response.data.cart);

      localStorage.setItem(
        "campusCart",
        JSON.stringify(response.data.cart)
      );
    } catch (error) {
      console.error("Remove cart item error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to remove product."
      );
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/cart"
      );

      setCart(response.data.cart);

      localStorage.removeItem("campusCart");
    } catch (error) {
      console.error("Clear cart error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to clear cart."
      );
    }
  };

  const total = cart.reduce(
    (sum, product) =>
      sum +
      product.price * (product.quantity || 1),
    0
  );

  const itemCount = cart.reduce(
    (sum, product) =>
      sum + (product.quantity || 1),
    0
  );

  if (loading) {
    return (
      <div className="loading">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <p className="section-tag">
          YOUR SHOPPING BAG
        </p>

        <h1>Shopping Cart 🛒</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-box">
          <h2>Your cart is empty</h2>

          <p>
            Add some products before checking out.
          </p>

          <Link
            to="/shop"
            className="primary-button"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((product) => (
              <div
                className="cart-item"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-item-info">
                  <h3>{product.name}</h3>

                  <p>{product.category}</p>

                  <p>
                    Quantity:{" "}
                    {product.quantity || 1}
                  </p>

                  <strong>
                    ₹
                    {product.price *
                      (product.quantity || 1)}
                  </strong>
                </div>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeItem(product.id)
                  }
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>

              <span>{itemCount}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>

              <strong>₹{total}</strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;