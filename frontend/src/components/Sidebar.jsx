import React from "react";
import Logout from "./Logout";

const Sidebar = ({ highlight, username }) => {
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
            <h4 className="text-[var(--backgroundGreen)]">{username}</h4>
            <h4 className="text-[var(--lightText)]">
              <Logout />
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
