import React from "react";

class AboutProject extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="about-card">
          <p className="section-tag">
            ABOUT CAMPUSCART
          </p>

          <h1>Built for Students 🎓</h1>

          <p>
            CampusCart is a student-focused
            e-commerce platform designed to make
            college shopping simple and affordable.
          </p>

          <p>
            Students can browse products, search by
            category, save favorites, add products
            to their cart and place orders.
          </p>

          <h2>Our Goal</h2>

          <p>
            To provide useful campus products in
            one simple platform.
          </p>
        </div>
      </div>
    );
  }
}

export default AboutProject;