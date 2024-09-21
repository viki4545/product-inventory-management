// src/pages/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../features/userSlice";
import { toast } from "react-toastify";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .then((data) => {
        localStorage.setItem("userId", data.payload.user._id);
        localStorage.setItem("token", data.payload.token);
        navigate(`/products/${data.payload.user._id}`);
        toast.success("Login sucessful!");
      })
      .catch((err) => {
        toast.error("Login failed! Please check your credentials");
        console.error(err);
      });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error">{error}</p>}
        <div className="link">
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
