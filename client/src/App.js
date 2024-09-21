// src/App.js
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home.js";
import Products from "./pages/product/Product.js";
import Login from "./pages/login/Login.js";
import Register from "./pages/register/Register.js";
import ProductForm from "./components/productForm/ProductForm.js";
import Navbar from "./components/navbar/Navbar.js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add Axios interceptor
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }, [navigate]);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products/:id" element={<Products />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit-product/:id" element={<ProductForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
