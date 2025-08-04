import React from "react";
import Logout from "../components/Logout";
import { useAuthContext } from "../hooks/useAuthContext";

const DashboardPage = () => {
  const { user } = useAuthContext();
  return (
    <div>
      {user && (
        <div>
          <Logout />
          <span>{user.email}</span>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
