import { useState } from "react";

function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] =
    useState("Cash on Delivery");

  const handleSubmit = (event) => {
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

    const existingOrders =
      JSON.parse(
        localStorage.getItem("campusOrders")
      ) || [];

    const newOrder = {
      id: Date.now(),
      customerName: name,
      phone,
      address,
      payment,
      products: cart,
      total: cart.reduce(
        (sum, product) => sum + product.price,
        0
      ),
      date: new Date().toLocaleString(),
    };

    existingOrders.push(newOrder);

    localStorage.setItem(
      "campusOrders",
      JSON.stringify(existingOrders)
    );

    localStorage.removeItem("campusCart");

    alert("Order placed successfully!");

    setName("");
    setPhone("");
    setAddress("");
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
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;