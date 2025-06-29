import React from "react";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
