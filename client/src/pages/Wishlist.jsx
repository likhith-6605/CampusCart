import { Link } from "react-router-dom";
import { useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("campusWishlist")
      ) || []
    );
  });

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (product) => product.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "campusWishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <div className="page-container">
      <div className="page-heading">
        <p className="section-tag">
          SAVED PRODUCTS
        </p>

        <h1>My Wishlist ❤️</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-box">
          <h2>Your wishlist is empty</h2>

          <p>
            Save products you want to buy later.
          </p>

          <Link
            to="/shop"
            className="primary-button"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
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
                  <strong>
                    ₹{product.price}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromWishlist(
                        product.id
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;