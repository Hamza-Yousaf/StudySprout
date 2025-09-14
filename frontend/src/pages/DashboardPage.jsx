import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import TotalStudyTime from "../components/TotalStudyTime";
import CourseCards from "../components/CourseCards";
import GoalsCard from "../components/GoalsCard";
import ContributionChart from "../components/ContributionChart";
import FarmStats from "../components/FarmStats";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const location = useLocation();

  var activePath;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  activePath = location.pathname;

  return (
    <div className="flex bg-[var(--offWhite)]">
      <Sidebar activePath={activePath} username={user.username} />
      <div className="flex flex-col p-4 w-full h-screen ">
        <TotalStudyTime />
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full m-2">
          <CourseCards />
          <GoalsCard selection={"all"} title={"Goals"} />
          <ContributionChart />
          <FarmStats />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
