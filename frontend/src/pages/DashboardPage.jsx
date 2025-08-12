import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import TotalStudyTime from "../components/TotalStudyTime";
import CourseCards from "../components/CourseCards";

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
  console.log(user);

  return (
    <div className="flex bg-[var(--offWhite)]">
      <Sidebar highlight={highlight} username={user.username} />
      <div className="flex flex-col p-4 w-full h-screen">
        <TotalStudyTime />
        <CourseCards user={user} />
      </div>
    </div>
  );
};

export default DashboardPage;
