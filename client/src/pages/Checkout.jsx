import { useState } from "react";
import axios from "axios";

function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] =
    useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill all delivery details.");
      return;
    }

    const cart =
      JSON.parse(
        localStorage.getItem("campusCart")
      ) || [];

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const total = cart.reduce(
      (sum, product) => sum + product.price,
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

      alert(response.data.message);

      localStorage.removeItem("campusCart");

      setName("");
      setPhone("");
      setAddress("");
      setPayment("Cash on Delivery");
    } catch (error) {
      console.error("Order error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <form
        className="auth-form checkout-form"
        onSubmit={handleSubmit}
      >
        <p className="section-tag">CHECKOUT</p>

        <h1>Place Your Order</h1>

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
          <option>Cash on Delivery</option>
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