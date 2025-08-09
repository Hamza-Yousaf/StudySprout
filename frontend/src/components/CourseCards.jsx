import React from "react";

const CourseCards = () => {
  return (
    <div className="w-1/3 h-full shadow-lg rounded-2xl bg-white p-6">
      {/* Card Title */}
      <h1 className="font-bold text-2xl mb-3">Courses</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      {/* Table Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
        <h2 className="font-semibold text-lg text-[var(--powerBlue)]">
          Course
        </h2>
        <h2 className="font-semibold text-lg text-[var(--backgroundGreen)]">
          Hours Studied
        </h2>
      </div>

      {/* Course Row */}
      <div className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-gray-50 transition">
        <span className="bg-[var(--skyBlue)] py-1 px-3 rounded-xl font-semibold text-[var(--powerBlue)]">
          Calculus
        </span>
        <span className="font-semibold text-[var(--backgroundGreen)]">47</span>
      </div>

      <div className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-gray-50 transition">
        <span className="bg-[var(--skyBlue)] py-1 px-3 rounded-xl font-semibold text-[var(--powerBlue)]">
          Physics
        </span>
        <span className="font-semibold text-[var(--backgroundGreen)]">12</span>
      </div>

      <div className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-gray-50 transition">
        <span className="bg-[var(--skyBlue)] py-1 px-3 rounded-xl font-semibold text-[var(--powerBlue)]">
          English
        </span>
        <span className="font-semibold text-[var(--backgroundGreen)]">54</span>
      </div>

      <div className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-gray-50 transition">
        <span className="bg-[var(--skyBlue)] py-1 px-3 rounded-xl font-semibold text-[var(--powerBlue)]">
          Business
        </span>
        <span className="font-semibold text-[var(--backgroundGreen)]">3</span>
      </div>
    </div>
  );
};

export default CourseCards;
