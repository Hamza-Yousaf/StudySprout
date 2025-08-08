import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import TotalStudyTime from "../components/TotalStudyTime";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const location = useLocation();

  var highlight = false;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (location.pathname == "/dashboard") {
    highlight = true;
  }

  console.log(highlight);

  return (
    <div className="flex">
      <Sidebar highlight={highlight} username={user.username} />
      <TotalStudyTime className="mx-auto mt-6 font-bold text-xl" />
    </div>
  );
};

export default DashboardPage;
