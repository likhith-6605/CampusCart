function ProductCard({ product }) {
  const addToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem("campusCart")) || [];

    existingCart.push(product);

    localStorage.setItem(
      "campusCart",
      JSON.stringify(existingCart)
    );

    alert(`${product.name} added to cart!`);
  };

  const addToWishlist = () => {
    const existingWishlist =
      JSON.parse(
        localStorage.getItem("campusWishlist")
      ) || [];

    const alreadyExists = existingWishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      alert("Product is already in your wishlist.");
      return;
    }

    existingWishlist.push(product);

    localStorage.setItem(
      "campusWishlist",
      JSON.stringify(existingWishlist)
    );

    alert(`${product.name} added to wishlist!`);
  };

  return (
    <div className="product-card">
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
          <strong>₹{product.price}</strong>

          <div className="product-buttons">
            <button
              className="wishlist-small"
              onClick={addToWishlist}
              title="Add to Wishlist"
            >
              ♡
            </button>

            <button
              className="add-button"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;