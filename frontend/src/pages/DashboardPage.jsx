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
      {/* <Logout /> */}
      <div className="w-64   bg-black h-screen p-4 flex flex-col">
        <h1 className="text-[var(--backgroundGreen)] text-2xl font-bold mx-auto mt-2">
          StudySprout
        </h1>
        <div className="mt-8 space-y-2 flex flex-grow flex-col">
          <h4 className="text-[var(--offWhite)]">Dashboard</h4>
          <h4 className="text-[var(--lightText)]">Farm</h4>
          <h4 className="text-[var(--lightText)]">Courses</h4>
          <h4 className="text-[var(--lightText)]">Timer</h4>
          <h4 className="text-[var(--lightText)]">Goals</h4>
          <h4 className="text-white">{user.username}</h4>
          <h4 className="text-[var(--lightText)] mt-auto">
            <Logout />
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
