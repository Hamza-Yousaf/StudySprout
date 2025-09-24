import React from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

let data = [
  { date: "2025-01-01", count: 0, level: 0 },
  { date: "2025-12-31", count: 0, level: 0 },
];

const ContributionChart = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    // check if updatedAt is > todays date at 00:00
    const today = new Date();
    const todayFormatted = today.toISOString().slice(0, 10);

    data = [
      { date: "2025-01-01", count: 0, level: 0 },
      { date: "2025-12-31", count: 0, level: 0 },
    ];

    courses.forEach((course) => {
      const courseDate = new Date(course.updatedAt);
      const formattedDate = courseDate.toISOString().slice(0, 10);
      if (formattedDate === todayFormatted && courseDate.getTime() > 0) {
        console.log("in if");
        data.push({
          date: formattedDate,
          count: 1,
          level: 1,
        });
      }
    });
  }, [courses]);

  return (
    <div className="w-full h-full bg-black shadow-lg rounded-2xl bg-white p-6 col-start-2 row-start 2 col-span-2">
      <h1 className="font-bold text-2xl mb-3">Tracker</h1>
      <div className="border-b border-gray-300 mb-6"></div>
      <div className="flex justify-center">
        <ActivityCalendar
          data={data}
          theme={{
            light: ["#4b3f72", "#6a5a91", "#927fbf", "#bfa2db", "#e0b0ff"],
            dark: ["#2e294e", "#4a3f72", "#7f6ca8", "#b497d6", "#e0b0ff"],
          }}
        />
      </div>

      <div className="flex justify-center">
        <h1 className="font-semibold mt-12 text-3xl">
          You've studied across{" "}
          <span className="text-[#e0b0ff] font-bold">
            {data.length - 2} days
          </span>
        </h1>
      </div>
    </div>
  );
};

export default ContributionChart;
