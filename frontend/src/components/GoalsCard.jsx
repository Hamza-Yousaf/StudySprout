import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const GoalsCard = () => {
  const [goals, setGoals] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user.id) {
      return;
    }

    const fetchGoals = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/goals/${user.id}`);

        const response = await res.json();
        setGoals(response.data);
      } catch (error) {
        console.log("error in fetching goals");
      }
    };

    fetchGoals();
  }, [user]);

  return (
    <div className="w-full h-full bg-black shadow-lg rounded-2xl bg-white p-6">
      <h1 className="font-bold text-2xl mb-3">Goals</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
        <h2 className="font-semibold text-lg text-[var(--powerBlue)]">Goal</h2>
        <h2 className="font-semibold text-lg text-[var(--sunflowerYellow)]">
          Status
        </h2>
      </div>

      {goals.length === 0 ? (
        <p>No goals yet...</p>
      ) : (
        goals.map((goal) => (
          <div
            key={goal._id}
            className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-gray-50 transition"
          >
            <span className="bg-[var(--skyBlue)] py-1 px-3 rounded-xl font-semibold text-[var(--powerBlue)]">
              {goal.title}
            </span>
            <span className="font-semibold">
              {goal.status ? (
                <p className="text-[var(--backgroundGreen)]">Completed</p>
              ) : (
                <p className="text-red-700">Incomplete</p>
              )}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default GoalsCard;
