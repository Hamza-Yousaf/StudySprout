import React from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

const CoursesPage = () => {
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
  return (
    <div className="flex bg-[var(--offWhite)]">
      <Sidebar highlight={highlight} username={user.username} />
      <div className="flex flex-col p-4 w-full h-screen ">
        <h1>Courses</h1>
      </div>
    </div>
  );
};

export default CoursesPage;
