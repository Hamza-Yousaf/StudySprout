import React from "react";
import Logout from "./Logout";
import { useNavigate } from "react-router";

const Sidebar = ({ activePath, username }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Courses", path: "/courses" },
    { name: "Farm", path: "/farm" },
    { name: "Timer", path: "/timer" },
    { name: "Goals", path: "/goals" },
  ];

  return (
    <div className="flex">
      {/* <Logout /> */}
      <div className="w-64 bg-black h-screen p-4 flex flex-col">
        <h1 className="text-[var(--backgroundGreen)] text-2xl font-bold mx-auto mt-2">
          StudySprout
        </h1>

        <div className="mt-8 space-y-2 flex flex-grow flex-col">
          {navItems.map((item) => (
            <h4
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer hover:text-[var(--offWhite)] ${
                activePath === item.path
                  ? "text-[var(--offWhite)]"
                  : "text-[var(--lightText)]"
              }`}
            >
              {item.name}
            </h4>
          ))}

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
