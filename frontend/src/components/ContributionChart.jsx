import React from "react";
import { ActivityCalendar } from "react-activity-calendar";

const data = [
  {
    date: "2025-01-01",
    count: 0,
    level: 0,
  },
  {
    date: "2025-08-13",
    count: 1,
    level: 3,
  },
  {
    date: "2025-12-31",
    count: 0,
    level: 0,
  },
];

const ContributionChart = () => {
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
