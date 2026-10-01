import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">
            🎓 MADE FOR CAMPUS LIFE
          </p>

          <h1>
            Everything You Need
            <br />
            For College Life.
          </h1>

          <p className="hero-description">
            Discover affordable and useful products made
            for students, from stationery and bags to
            everyday campus essentials.
          </p>

          <Link
            to="/shop"
            className="primary-button"
          >
            Shop Now →
          </Link>
        </div>

        <div className="hero-card">
          <div className="hero-icon">🎒</div>

          <h3>Campus Essentials</h3>

          <p>
            Smart products for students, all in one place.
          </p>
        </div>
      </section>

      <section className="categories-section">
        <div className="section-title">
          <p className="section-tag">EXPLORE</p>
          <h2>Shop by Category</h2>
        </div>

        <div className="category-grid">
          <Link
            to="/shop?category=Bags"
            className="category-card"
          >
            <span>🎒</span>
            <h3>Bags</h3>
            <p>Backpacks & laptop bags</p>
          </Link>

          <Link
            to="/shop?category=Clothing"
            className="category-card"
          >
            <span>👕</span>
            <h3>Clothing</h3>
            <p>College wear & hoodies</p>
          </Link>

          <Link
            to="/shop?category=Stationery"
            className="category-card"
          >
            <span>📚</span>
            <h3>Stationery</h3>
            <p>Notes & study essentials</p>
          </Link>

          <Link
            to="/shop?category=Accessories"
            className="category-card"
          >
            <span>💧</span>
            <h3>Accessories</h3>
            <p>Useful everyday items</p>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <span>💰</span>

          <div>
            <h3>Student Friendly Prices</h3>
            <p>Useful products at affordable prices.</p>
          </div>
        </div>

        <div className="feature-card">
          <span>🚚</span>

          <div>
            <h3>Campus Delivery</h3>
            <p>Convenient delivery for students.</p>
          </div>
        </div>

        <div className="feature-card">
          <span>❤️</span>

          <div>
            <h3>Save Your Favorites</h3>
            <p>Add products to your wishlist.</p>
          </div>
        </div>
      </section>

      <section className="campus-mode">
        <div className="campus-mode-content">
          <p className="section-tag">
            CAMPUSCART SPECIAL
          </p>

          <h2>Campus Essentials Mode 🎓</h2>

          <p>
            Not sure what you need? Choose your campus
            activity and CampusCart will show useful
            products for that situation.
          </p>

          <Link
            to="/campus-essentials"
            className="secondary-button"
          >
            Explore Campus Mode →
          </Link>
        </div>

        <div className="campus-mode-card">
          <span>📖</span>
          <strong>Exam Preparation</strong>
          <small>Study essentials</small>
        </div>
      </section>
    </div>
  );
}

export default Home;