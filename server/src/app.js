const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

const JWT_SECRET = "campuscart_secret_key_2026";

/* =========================
   PRODUCTS
========================= */

const products = [
  {
    id: 1,
    name: "Campus Backpack",
    category: "Bags",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description:
      "Durable backpack suitable for college students.",
  },
  {
    id: 2,
    name: "College T-Shirt",
    category: "Clothing",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    description:
      "Comfortable cotton t-shirt for everyday campus wear.",
  },
  {
    id: 3,
    name: "Student Notebook",
    category: "Stationery",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    description:
      "High-quality notebook for lectures and assignments.",
  },
  {
    id: 4,
    name: "Water Bottle",
    category: "Accessories",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    description:
      "Reusable water bottle for students.",
  },
  {
    id: 5,
    name: "College Hoodie",
    category: "Clothing",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    description:
      "Warm and comfortable college hoodie.",
  },
  {
    id: 6,
    name: "Laptop Sleeve",
    category: "Bags",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80",
    description:
      "Protective laptop sleeve for students.",
  },
];

/* =========================
   TEMPORARY USERS
========================= */

const users = [];

/* =========================
   TEMPORARY ORDERS
========================= */

const orders = [];

/* =========================
   TEMPORARY CART
========================= */

const cart = [];

/* =========================
   HOME API
========================= */

app.get("/", (req, res) => {
  res.json({
    message: "CampusCart API is running successfully",
  });
});

/* =========================
   HEALTH API
========================= */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CampusCart backend is healthy",
  });
});

/* =========================
   PRODUCT APIs
========================= */

app.get("/api/products", (req, res) => {
  res.json({
    success: true,
    products: products,
  });
});

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

/* =========================
   CART APIs
========================= */

/* GET CART */

app.get("/api/cart", (req, res) => {
  res.json({
    success: true,
    message: "Cart fetched successfully.",
    cart: cart,
  });
});

/* ADD PRODUCT TO CART */

app.post("/api/cart", (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = products.find(
      (item) => item.id === Number(productId)
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    res.status(201).json({
      success: true,
      message: `${product.name} added to cart.`,
      cart: cart,
    });
  } catch (error) {
    console.error("Add cart error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while adding product to cart.",
    });
  }
});

/* REMOVE PRODUCT FROM CART */

app.delete("/api/cart/:id", (req, res) => {
  const productId = Number(req.params.id);

  const itemIndex = cart.findIndex(
    (item) => item.id === productId
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found in cart.",
    });
  }

  const removedItem = cart[itemIndex];

  cart.splice(itemIndex, 1);

  res.json({
    success: true,
    message: `${removedItem.name} removed from cart.`,
    cart: cart,
  });
});

/* CLEAR CART */

app.delete("/api/cart", (req, res) => {
  cart.length = 0;

  res.json({
    success: true,
    message: "Cart cleared successfully.",
    cart: cart,
  });
});

/* =========================
   REGISTER API TEST
========================= */

app.get("/api/users/register", (req, res) => {
  res.json({
    success: true,
    message:
      "Registration API is working. Use POST to register a user.",
  });
});

/* =========================
   LOGIN API TEST
========================= */

app.get("/api/users/login", (req, res) => {
  res.json({
    success: true,
    message:
      "Login API is working. Use POST to login.",
  });
});

/* =========================
   REGISTER API
========================= */

app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const newUser = {
      id: users.length + 1,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
});

/* =========================
   LOGIN API
========================= */

app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password.",
      });
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
});

/* =========================
   CREATE ORDER API
========================= */

app.post("/api/orders", (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      payment,
      products,
      total,
      userEmail,
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !address ||
      !payment ||
      !products ||
      products.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete order details.",
      });
    }

    const newOrder = {
      id: Date.now(),
      customerName,
      phone,
      address,
      payment,
      products,
      total,
      userEmail: userEmail || null,
      status: "Placed",
      date: new Date().toLocaleString(),
    };

    orders.push(newOrder);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while placing order.",
    });
  }
});

/* =========================
   GET ORDERS API
========================= */

app.get("/api/orders", (req, res) => {
  const { email } = req.query;

  if (email) {
    const userOrders = orders.filter(
      (order) => order.userEmail === email
    );

    return res.json({
      success: true,
      orders: userOrders,
    });
  }

  res.json({
    success: true,
    orders: orders,
  });
});

/* =========================
   DELETE ALL ORDERS API
========================= */

app.delete("/api/orders", (req, res) => {
  orders.length = 0;

  res.json({
    success: true,
    message: "All orders cleared successfully.",
  });
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(
    `CampusCart server running on http://localhost:${PORT}`
  );
});