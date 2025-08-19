import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courseDate, setCourseDate] = useState({
    title: "",
    priority: "",
    deadline: "",
  });

  const { user } = useAuthContext();
  const location = useLocation();

  var activePath;

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("userId", user.id);

    const jdata = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(jdata),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {}
  };

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

          <form
            className="w-1/2 bg-[var(--skyBlue)] shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleAddCourse}
          >
            <div className="flex justify-between">
              <div className="mb-4">
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
              <div>
                <label
                  className="block text-black text-xl font-bold mb-2"
                  htmlFor="deadline"
                >
                  Exam Date
                </label>
                <input
                  name="deadline"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="deadline"
                  type="date"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-black0 text-xl font-bold mb-2"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  name="priority"
                  id="priority"
                  className="border py-2 px-3 rounded"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--darkText)] py-2 rounded-xl text-white font-semibold"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
