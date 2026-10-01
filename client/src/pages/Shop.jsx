import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const urlCategory =
    searchParams.get("category") || "All";

  const [category, setCategory] =
    useState(urlCategory);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error loading products:",
          error
        );

        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div className="page-container">
      <div className="page-heading">
        <p className="section-tag">
          CAMPUS STORE
        </p>

        <h1>Shop Products</h1>

        <p>
          Find useful products for your
          everyday college life.
        </p>
      </div>

      <div className="shop-controls">
        <input
          type="text"
          placeholder="🔎 Search products..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

        <select
          value={category}
          onChange={(event) =>
            setCategory(
              event.target.value
            )
          }
        >
          <option value="All">
            All Categories
          </option>

          <option value="Bags">
            Bags
          </option>

          <option value="Clothing">
            Clothing
          </option>

          <option value="Stationery">
            Stationery
          </option>

          <option value="Accessories">
            Accessories
          </option>
        </select>
      </div>

      {loading ? (
        <div className="loading">
          Loading products...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-box">
          <h2>No products found</h2>

          <p>
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Shop;