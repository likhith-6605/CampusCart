import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">🎓</span>
        CampusCart
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">♡ Wishlist</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/about">About</Link>
      </nav>

      <div className="nav-actions">
        <Link to="/login" className="login-link">
          Login
        </Link>

        <Link to="/cart" className="cart-button">
          🛒 Cart
        </Link>
      </div>
    </header>
  );
}

export default Navbar;