import { Link } from "react-router-dom";
import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("campusCart")
      ) || []
    );
  });

  const removeItem = (index) => {
    const updatedCart = cart.filter(
      (_, itemIndex) => itemIndex !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "campusCart",
      JSON.stringify(updatedCart)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("campusCart");
  };

  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  );

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
            {cart.map((product, index) => (
              <div
                className="cart-item"
                key={`${product.id}-${index}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-item-info">
                  <h3>{product.name}</h3>

                  <p>{product.category}</p>

                  <strong>
                    ₹{product.price}
                  </strong>
                </div>

                <button
                  className="remove-button"
                  onClick={() => removeItem(index)}
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
              <span>{cart.length}</span>
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