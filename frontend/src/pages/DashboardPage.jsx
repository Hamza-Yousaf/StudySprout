import React, { useEffect } from "react";
import Logout from "../components/Logout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Logout />
      <span>{user.email}</span>
    </div>
  );
};

export default DashboardPage;
