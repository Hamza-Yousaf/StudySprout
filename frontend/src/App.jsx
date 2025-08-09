import React from "react";
import { Route, Routes } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const paths = ["/register", "/login", "/dashboard"];

  useEffect(() => {
    if (!paths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
};

export default App;
