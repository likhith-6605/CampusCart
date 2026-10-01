import { useState } from "react";

function CampusEssentials() {
  const [selectedMode, setSelectedMode] =
    useState("");

  const modes = {
    Exam: {
      title: "Exam Preparation 📚",
      description:
        "Useful products for studying and preparing for exams.",
      items: [
        "Student Notebook",
        "Stationery",
      ],
    },

    Hostel: {
      title: "Hostel Essentials 🏠",
      description:
        "Everyday products useful for hostel students.",
      items: [
        "Water Bottle",
        "Campus Backpack",
      ],
    },

    Coding: {
      title: "Coding & Lab 💻",
      description:
        "Useful products for coding classes and lab sessions.",
      items: [
        "Laptop Sleeve",
        "Campus Backpack",
      ],
    },

    Daily: {
      title: "Daily College 🎓",
      description:
        "Everyday essentials for attending college.",
      items: [
        "College T-Shirt",
        "Water Bottle",
      ],
    },
  };

  return (
    <div className="page-container campus-page">
      <div className="page-heading">
        <p className="section-tag">
          CAMPUS ESSENTIALS
        </p>

        <h1>Campus Essentials Mode 🎓</h1>

        <p>
          Select what you are preparing for and
          discover useful products.
        </p>
      </div>

      <div className="mode-grid">
        <button
          className="mode-card"
          onClick={() => setSelectedMode("Exam")}
        >
          📚
          <strong>Exam Preparation</strong>
          <span>Study essentials</span>
        </button>

        <button
          className="mode-card"
          onClick={() => setSelectedMode("Hostel")}
        >
          🏠
          <strong>Hostel Essentials</strong>
          <span>Daily hostel needs</span>
        </button>

        <button
          className="mode-card"
          onClick={() => setSelectedMode("Coding")}
        >
          💻
          <strong>Coding & Lab</strong>
          <span>Lab essentials</span>
        </button>

        <button
          className="mode-card"
          onClick={() => setSelectedMode("Daily")}
        >
          🎓
          <strong>Daily College</strong>
          <span>Everyday essentials</span>
        </button>
      </div>

      {selectedMode && (
        <div className="mode-result">
          <h2>
            {modes[selectedMode].title}
          </h2>

          <p>
            {modes[selectedMode].description}
          </p>

          <h3>Recommended Products</h3>

          <ul>
            {modes[selectedMode].items.map(
              (item) => (
                <li key={item}>{item}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CampusEssentials;