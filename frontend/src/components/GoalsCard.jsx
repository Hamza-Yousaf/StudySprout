import React from "react";

const GoalsCard = () => {
  return (
    <div className="w-1/3 h-[40%] bg-black mx-4 shadow-lg rounded-2xl bg-white p-6">
      <h1 className="font-bold text-2xl mb-3">Goals</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
        <h2 className="font-semibold text-lg text-[var(--powerBlue)]">Goal</h2>
        <h2 className="font-semibold text-lg text-[var(--backgroundGreen)]">
          Status
        </h2>
      </div>
    </div>
  );
};

export default GoalsCard;
