import React from "react";

const TotalStudyTime = ({ className }) => {
  return (
    <div className="mx-auto my-2 font-bold text-xl">
      <h1>
        You've studied for <span className="underline">18</span> hours!
      </h1>
    </div>
  );
};

export default TotalStudyTime;
