# 🛒 CampusCart – Student E-Commerce Platform

CampusCart is a full-stack e-commerce web application designed for college students. It allows users to browse campus-friendly products, search and filter products, manage a shopping cart, save wishlist items, create an account, log in, checkout, and view orders.

## 📌 Problem Statement

College students often need products such as bags, stationery, clothing, and accessories, but finding useful products in one simple platform can be inconvenient.

CampusCart provides a simple student-focused shopping platform where users can browse products, search for products, manage their cart, save wishlist items, and place orders.

## 🎯 Objectives

- Build a responsive e-commerce application using React.js.
- Create reusable React components.
- Implement client-side routing.
- Demonstrate React Hooks such as `useState` and `useEffect`.
- Implement form handling for registration, login, and checkout.
- Develop a REST API using Express.js.
- Connect the React frontend with the Express backend.
- Implement product search and category filtering.
- Implement wishlist functionality.
- Demonstrate both Functional and Class Components.

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router
- Axios
- HTML
- CSS
- Vite

### Backend

- Node.js
- Express.js
- CORS
- JWT
- bcryptjs

### Development Tools

- Visual Studio Code
- Git
- GitHub
- PowerShell

## ✨ Main Features

- 🏠 Home page
- 🛍️ Product listing
- 🔎 Product search
- 🏷️ Category filtering
- 📦 Product details
- 🛒 Shopping cart
- ❤️ Wishlist
- 👤 User registration
- 🔐 User login
- 💳 Checkout
- 📋 Order history
- 📱 Responsive design
- 🔌 Express REST API

## ⭐ Independent Modifications

The project was developed based on the selected e-commerce tutorial and independently modified with additional functionality.

### 1. Product Search and Category Filtering

Users can search for products by name and filter products according to categories such as:

- Bags
- Clothing
- Stationery
- Accessories

### 2. Wishlist

Users can save products to a wishlist using the wishlist button and view their saved products separately.

### 3. Class Component

A separate `AboutProject` page was implemented using a React Class Component to demonstrate the use of both modern Functional Components and Class Components.

## 🧩 React Concepts Demonstrated

### Components

The application is divided into reusable components such as:

- Navbar
- Footer
- ProductCard

### Props

`ProductCard` receives product information from the parent `Shop` component using props.

Example:

```jsx
<ProductCard product={product} />