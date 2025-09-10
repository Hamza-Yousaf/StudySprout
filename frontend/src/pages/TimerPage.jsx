import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useRef } from "react";

const TimerPage = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

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

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const formatTime = (time) => {
    const hrs = String(Math.floor(time / 3600)).padStart(2, "0");
    const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const saveTime = async () => {
    if (!selectedCourse) {
      alert("Please select a course before saving time.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${selectedCourse}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ time }),
        }
      );

      const data = await res.json();
      if (data.success) {
        console.log("Course updated successfully");
      } else {
        console.error("Error updating course ", data.message);
      }
    } catch (err) {
      console.error("Request failed ", err);
    }
  };

  console.log(selectedCourse);

  return (
    <div className="bg-[var(--oliveLeaf)] flex">
      <Sidebar />
      <div className="m-auto flex flex-col w-auto items-center">
        <h1 className="text-4xl font-bold mb-4 underline">Timer</h1>

        <div className="flex flex-col items-center">
          <h1 className="text-4xl mb-2">{formatTime(time)}</h1>
          <div className="flex space-x-4 text-3xl">
            <button
              className="w-auto shadow-sm px-4 py-2 cursor-pointer"
              onClick={startTimer}
            >
              Start
            </button>
            <button
              className="w-auto shadow-sm px-4 py-2 cursor-pointer"
              onClick={stopTimer}
            >
              Stop
            </button>
            <button
              className="w-auto shadow-sm px-4 py-2 cursor-pointer"
              onClick={resetTimer}
            >
              Reset
            </button>
          </div>
          <button
            className="w-full text-3xl items-center border shadow-xl px-4 py-2 cursor-pointer mt-2"
            onClick={saveTime}
          >
            Save
          </button>
          <div className="mt-8 flex flex-col items-center">
            <label className="block text-xl font-bold" htmlFor="course">
              Select Course
            </label>
            <select
              name="course"
              id="course"
              className="border py-2 px-3 rounded"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
