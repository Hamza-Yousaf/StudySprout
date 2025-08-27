import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

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

  return (
    <div className="w-full row-span-2 shadow-lg rounded-2xl bg-white p-6">
      {/* Card Title */}
      <h1 className="font-bold text-2xl mb-3">Courses</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      {/* Table Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
        <h2 className="font-semibold text-lg text-[var(--powerBlue)]">
          Course
        </h2>
        <h2 className="font-semibold text-lg text-black]">Priority</h2>
        <h2 className="font-semibold text-lg text-[var(--backgroundGreen)]">
          Hours Studied
        </h2>
      </div>

      {/* Course Row */}
      {courses.length === 0 ? (
        <p>No courses yet...</p>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-gray-50 transition"
          >
            <span className="bg-[var(--skyBlue)] py-1 px-3 rounded-xl font-semibold text-[var(--powerBlue)] w-[100px]">
              {course.title}
            </span>
            <span className="bg-black py-1 px-3 rounded-xl font-semibold text-white w-[80px]">
              {course.priority}
            </span>
            <span className="font-semibold text-[var(--backgroundGreen)] w-[100px]">
              {course.hoursStudied || 0}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseCards;
