import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const TimerPage = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      //null or undefined (?)
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${user.id}`);

        const response = await res.json();
        setCourses(response.data);
      } catch (error) {
        console.log("error in fetching courses");
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <div className="bg-[var(--oliveLeaf)] flex">
      <Sidebar />
      <div className="m-auto flex flex-col w-auto items-center">
        <h1 className="text-4xl font-bold mb-4 underline">Timer</h1>

        <div className="flex flex-col items-center">
          <div className="text-4xl mb-2">00:00:00</div>
          <div className="flex space-x-4 text-3xl">
            <button className="w-auto shadow-sm px-4 py-2 cursor-pointer">
              Start
            </button>
            <button className="w-auto shadow-sm px-4 py-2 cursor-pointer">
              Stop
            </button>
            <button className="w-auto shadow-sm px-4 py-2 cursor-pointer">
              Reset
            </button>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <label className="block text-xl font-bold" htmlFor="course">
              Select Course
            </label>
            <select
              name="course"
              id="course"
              className="border py-2 px-3 rounded italic cursor-pointer"
            >
              {courses.map((course) => (
                <option key={course._id}>{course.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
