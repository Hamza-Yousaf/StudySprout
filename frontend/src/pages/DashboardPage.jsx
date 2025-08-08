import React, { useEffect } from "react";
import Logout from "../components/Logout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

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
      {/* <Logout /> */}
      <div className="w-64 bg-black h-screen p-4 flex flex-col">
        <h1 className="text-[var(--backgroundGreen)] text-2xl font-bold mx-auto mt-2">
          StudySprout
        </h1>
        <div className="mt-8 space-y-2 flex flex-grow flex-col">
          <h4
            className={`${
              highlight ? "text-[var(--offWhite)]" : "text-[var(--lightText)]"
            }`}
          >
            Dashboard
          </h4>
          <h4 className="text-[var(--lightText)] hover:text-[var(--offWhite)] transition-[2]">
            Farm
          </h4>
          <h4 className="text-[var(--lightText)] hover:text-[var(--offWhite)] transition-[2]">
            Courses
          </h4>
          <h4 className="text-[var(--lightText)] hover:text-[var(--offWhite)] transition-[2]">
            Timer
          </h4>
          <h4 className="text-[var(--lightText)] hover:text-[var(--offWhite)] transition-[2]">
            Goals
          </h4>

          <div className="mt-auto">
            <h4 className="text-[var(--backgroundGreen)]">{user.username}</h4>
            <h4 className="text-[var(--lightText)]">
              <Logout />
            </h4>
          </div>
        </div>
      </div>

      <h1 className="mx-auto mt-6 font-bold text-xl">
        You've studied for <span className="underline">18</span> hours!
      </h1>
    </div>
  );
};

export default DashboardPage;
