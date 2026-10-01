import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("campusUser")) ||
      null
    );
  });

  const handleLogout = () => {
    localStorage.removeItem("campusUser");
    localStorage.removeItem("campusToken");

    setUser(null);

    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">🎓</span>
        CampusCart
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/shop">Shop</Link>

        <Link to="/wishlist">
          ♡ Wishlist
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/about">
          About
        </Link>
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-greeting">
              👤 {user.name}
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>
        )}

        <Link
          to="/cart"
          className="cart-button"
        >
          🛒 Cart
        </Link>
      </div>
    </header>
  );
}

export default Navbar;