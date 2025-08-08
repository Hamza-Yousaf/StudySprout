import React from "react";

const TotalStudyTime = ({ className }) => {
  return (
    <div className={className}>
      <h1>
        You've studied for <span className="underline">18</span> hours!
      </h1>
    </div>
  );
};

export default TotalStudyTime;
