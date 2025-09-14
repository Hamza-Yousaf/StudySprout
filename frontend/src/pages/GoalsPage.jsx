import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import GoalsCard from "../components/GoalsCard";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const GoalsPage = () => {
  const { user } = useAuthContext();
  const [toggleGoals, setToggleGoals] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  var activePath;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const toggleStates = () => {
    setToggleGoals(!toggleGoals);
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("userId", user.id);
    formData.append("status", false);

    const jdata = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(jdata),
      });

      const data = await res.json();
      if (res.ok) {
        setToggleGoals(false);
      }
      console.log(data);
    } catch (error) {}
  };

  activePath = location.pathname;

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} username={user.username} />
      {!toggleGoals ? (
        <div className="w-full flex flex-col">
          <div className="m-auto py-4">
            <button
              className="font-bold text-4xl bg-[var(--backgroundGreen)] p-2 rounded-lg cursor-pointer hover:bg-[var(--backgroundDarkGreen)]"
              onClick={toggleStates}
            >
              Create new goal
            </button>
          </div>
          <div className="p-4 w-full h-full grid grid-cols-3 gap-4">
            <GoalsCard selection={"all"} title={"All"} />
            <GoalsCard selection={"completed"} title={"Completed"} />
            <GoalsCard selection={"incompleted"} title={"Incompleted"} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-4 w-full m-auto">
          <div className="w-1/2 h-1/2 bg-black shadow-lg rounded-2xl bg-white p-6 m-auto ">
            <h1 className="font-bold text-2xl mb-3">Create new goal</h1>
            <div className="border-b border-gray-300 mb-6"></div>

            <form
              className="w-full bg-[var(--backgroundGreen)] shadow-md rounded px-8 pt-6 pb-8 mb-8"
              onSubmit={handleAddGoal}
            >
              <div className="flex justify-between space-x-2">
                <div className="mb-4 w-full">
                  <label
                    className="block text-black text-xl font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    name="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="title..."
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--darkText)] py-2 rounded-xl text-white font-semibold hover:bg-[var(--darkBrown)] transition duration-100 ease-in-out transform hover:scale-105 mb-2"
              >
                Create
              </button>
              <button
                className="w-full bg-white py-2 rounded-xl text-black font-semibold transition duration-100 ease-in-out transform hover:scale-105"
                onClick={toggleStates}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
