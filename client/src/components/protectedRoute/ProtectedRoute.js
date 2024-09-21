import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("token");
  return <>{user ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default ProtectedRoute;
