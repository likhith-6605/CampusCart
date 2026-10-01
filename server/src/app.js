const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "CampusCart API is running successfully",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CampusCart backend is healthy",
  });
});

// Temporary product data
const products = [
  {
    id: 1,
    name: "Campus Backpack",
    category: "Bags",
    price: 799,
    image: "https://via.placeholder.com/300x300?text=Campus+Backpack",
    description: "Durable backpack suitable for college students.",
  },
  {
    id: 2,
    name: "College T-Shirt",
    category: "Clothing",
    price: 499,
    image: "https://via.placeholder.com/300x300?text=College+T-Shirt",
    description: "Comfortable cotton t-shirt for everyday campus wear.",
  },
  {
    id: 3,
    name: "Student Notebook",
    category: "Stationery",
    price: 149,
    image: "https://via.placeholder.com/300x300?text=Student+Notebook",
    description: "High-quality notebook for lectures and assignments.",
  },
  {
    id: 4,
    name: "Water Bottle",
    category: "Accessories",
    price: 299,
    image: "https://via.placeholder.com/300x300?text=Water+Bottle",
    description: "Reusable water bottle for students.",
  },
  {
    id: 5,
    name: "College Hoodie",
    category: "Clothing",
    price: 999,
    image: "https://via.placeholder.com/300x300?text=College+Hoodie",
    description: "Warm and comfortable college hoodie.",
  },
  {
    id: 6,
    name: "Laptop Sleeve",
    category: "Bags",
    price: 699,
    image: "https://via.placeholder.com/300x300?text=Laptop+Sleeve",
    description: "Protective laptop sleeve for students.",
  },
];

// Get all products
app.get("/api/products", (req, res) => {
  res.json({
    success: true,
    products: products,
  });
});

// Get product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    product: product,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`CampusCart server running on http://localhost:${PORT}`);
});