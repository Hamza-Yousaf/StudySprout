import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";

const TotalStudyTime = ({ className }) => {
  const { user } = useAuthContext();
  const [studyTime, setStudyTime] = useState(0);

  if (!user.id) {
    return;
  }

  const fetchCourses = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${user.id}`);

      const response = await res.json();
      return response.data;
    } catch (error) {
      console.log("error in fetching courses");
      return [];
    }
  };

  useEffect(() => {
    const getStudyTime = async () => {
      const courses = await fetchCourses();
      let time = 0;

      courses.forEach((course) => {
        if (course.hoursStudied) {
          time = time += course.hoursStudied;
        }
      });
      setStudyTime(time);
    };

    if (user) {
      getStudyTime();
    }
  }, [user]);

  return (
    <div className="mx-auto my-2 font-bold text-xl">
      <h1>
        You've studied for{" "}
        <span className="underline">{Math.floor(studyTime * 100) / 100}</span>{" "}
        hours!
      </h1>
    </div>
  );
};

export default TotalStudyTime;
