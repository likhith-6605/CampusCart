import { Link } from "react-router-dom";
import { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("campusOrders")
      ) || []
    );
  });

  const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem("campusOrders");
  };

  return (
    <div className="page-container">
      <div className="page-heading">
        <p className="section-tag">
          ORDER HISTORY
        </p>

        <h1>My Orders 📦</h1>
      </div>

      {orders.length === 0 ? (
        <div className="empty-box">
          <h2>No orders yet</h2>

          <p>
            Your completed orders will appear here.
          </p>

          <Link
            to="/shop"
            className="primary-button"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>{order.date}</p>
                </div>

                <strong>₹{order.total}</strong>
              </div>

              <p>
                <strong>Customer:</strong>{" "}
                {order.customerName}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.payment}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.address}
              </p>

              <h4>Products</h4>

              <ul>
                {order.products.map(
                  (product, index) => (
                    <li
                      key={`${product.id}-${index}`}
                    >
                      {product.name} - ₹
                      {product.price}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}

          <button
            className="clear-cart-button"
            onClick={clearOrders}
          >
            Clear Order History
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;