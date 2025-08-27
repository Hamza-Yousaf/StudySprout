import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import AddCourse from "../components/AddCourse";

const CoursesPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const location = useLocation();

  var activePath;
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const changeDisplay = () => {
    setButtonPressed(!buttonPressed);
  };

  activePath = location.pathname;
  return (
    <div className="flex bg-[var(--offWhite)]">
      <Sidebar activePath={activePath} username={user.username} />
      <div className="flex flex-col w-full h-full m-auto">
        <AddCourse hidden={buttonPressed} />
        {!buttonPressed ? (
          <button
            className="text-3xl text-[var(--powerBlue)] font-semibold cursor-pointer underline"
            onClick={changeDisplay}
          >
            View All Courses
          </button>
        ) : (
          <button onClick={changeDisplay}>Add course</button>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
