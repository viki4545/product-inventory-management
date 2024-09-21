// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar.js";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h1>Welcome to the Product Inventory Management System</h1>
          <p>
            Manage your products efficiently with our system. You can add,
            update, or delete products as per your needs. Please log in to
            access the full features.
          </p>
          {/* <div className="home-buttons">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
            <Link to="/products" className="btn">
              View Products
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
