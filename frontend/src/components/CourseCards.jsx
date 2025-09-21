import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const CourseCards = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user.id) {
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-yellow-400 text-yellow-900";
      case "Medium":
        return "bg-orange-400 text-orange-900";
      case "High":
        return "bg-red-500 text-white";
      case "Urgent":
        return "bg-red-800 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const cleanDeadline = (deadline) => {
    if (!deadline) return "No Deadline";
    return deadline.toString().slice(0, 10);
  };

  const deleteCourse = async (courseID) => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${courseID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setCourses((prev) => prev.filter((course) => course._id !== courseID));
      toast("Course deleted");
    } catch (error) {
      console.log("error in deleting courses");
    }
  };

  return (
    <div className="w-full row-span-2 shadow-lg rounded-2xl bg-white p-6">
      <h1 className="font-bold text-2xl mb-3">Courses</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
        <h2 className="font-semibold text-lg text-[var(--powerBlue)]">
          Course
        </h2>
        <h2 className="font-semibold text-lg text-black]">Exam</h2>
        <h2 className="font-semibold text-lg text-[var(--backgroundGreen)]">
          Hours Studied
        </h2>
      </div>

      {courses.length === 0 ? (
        <p>No courses yet...</p>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-gray-50 transition"
            onDoubleClick={() => deleteCourse(course._id)}
          >
            <span
              className={`bg-[var(--skyBlue)] py-1 px-3 rounded-xl font-semibold ${getPriorityColor(
                course.priority
              )} w-[100px]`}
            >
              {course.title}
            </span>
            <span className="text-[10px] bg-black py-1 px-3 rounded-xl font-semibold text-white w-[80px]">
              {cleanDeadline(course.deadline)}
            </span>
            <span className="font-semibold text-[var(--backgroundGreen)] w-[100px]">
              {Math.floor(course.hoursStudied * 100) / 100 || 0}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseCards;
