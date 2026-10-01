import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] =
    useState("Cash on Delivery");

  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cart"
        );

        setCart(response.data.cart);
      } catch (error) {
        console.error(
          "Checkout cart loading error:",
          error
        );

        alert(
          "Unable to load your cart."
        );
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !phone || !address) {
      alert(
        "Please fill all delivery details."
      );
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const total = cart.reduce(
      (sum, product) =>
        sum +
        product.price *
          (product.quantity || 1),
      0
    );

    const storedUser =
      JSON.parse(
        localStorage.getItem("campusUser")
      ) || null;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          customerName: name,
          phone,
          address,
          payment,
          products: cart,
          total,
          userEmail: storedUser?.email || null,
        }
      );

      await axios.delete(
        "http://localhost:5000/api/cart"
      );

      localStorage.removeItem(
        "campusCart"
      );

      alert(response.data.message);

      setName("");
      setPhone("");
      setAddress("");
      setPayment("Cash on Delivery");
      setCart([]);

      navigate("/orders");
    } catch (error) {
      console.error(
        "Order error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingCart) {
    return (
      <div className="loading">
        Loading checkout...
      </div>
    );
  }

  return (
    <div className="form-page">
      <form
        className="auth-form checkout-form"
        onSubmit={handleSubmit}
      >
        <p className="section-tag">
          CHECKOUT
        </p>

        <h1>Place Your Order</h1>

        <p>
          {cart.length} product
          {cart.length !== 1 ? "s" : ""} in
          your cart
        </p>

        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <label>Phone Number</label>

        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
        />

        <label>Delivery Address</label>

        <textarea
          placeholder="Enter delivery address"
          value={address}
          onChange={(event) =>
            setAddress(event.target.value)
          }
        />

        <label>Payment Method</label>

        <select
          value={payment}
          onChange={(event) =>
            setPayment(event.target.value)
          }
        >
          <option>
            Cash on Delivery
          </option>

          <option>UPI</option>

          <option>Card</option>
        </select>

        <button
          type="submit"
          className="form-button"
          disabled={loading}
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;