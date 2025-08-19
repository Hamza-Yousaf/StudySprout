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
        <div className="w-3/4 h-3/4 bg-black shadow-lg rounded-2xl bg-white p-6 m-auto">
          <h1 className="font-bold text-2xl mb-3">Add a course</h1>
          <div className="border-b border-gray-300 mb-6"></div>

          <form className="w-1/2 bg-[var(--skyBlue)] shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <div class="mb-4">
              <label
                class="block text-black text-xl font-bold mb-2"
                for="title"
              >
                Title
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="title..."
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-black0 text-xl font-bold mb-2"
                for="priority"
              >
                Priority
              </label>
              <select name="priority" id="priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
