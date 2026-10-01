import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser =
          JSON.parse(
            localStorage.getItem("campusUser")
          ) || null;

        const url = storedUser?.email
          ? `http://localhost:5000/api/orders?email=${encodeURIComponent(
              storedUser.email
            )}`
          : "http://localhost:5000/api/orders";

        const response = await axios.get(url);

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error loading orders:", error);

        alert(
          "Unable to load orders from the server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const clearOrders = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your order history?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        "http://localhost:5000/api/orders"
      );

      setOrders([]);

      alert("Order history cleared successfully.");
    } catch (error) {
      console.error("Error clearing orders:", error);

      alert(
        "Unable to clear order history."
      );
    }
  };

  return (
    <div className="page-container">
      <div className="page-heading">
        <p className="section-tag">
          ORDER HISTORY
        </p>

        <h1>My Orders 📦</h1>

        <p>
          View your orders received from the
          CampusCart server.
        </p>
      </div>

      {loading ? (
        <div className="empty-box">
          <h2>Loading orders...</h2>

          <p>
            Please wait while we retrieve your orders.
          </p>
        </div>
      ) : orders.length === 0 ? (
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
                  <h3>
                    Order #{order.id}
                  </h3>

                  <p>{order.date}</p>
                </div>

                <strong>
                  ₹{order.total}
                </strong>
              </div>

              <p>
                <strong>Customer:</strong>{" "}
                {order.customerName}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.phone}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.payment}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.status}
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