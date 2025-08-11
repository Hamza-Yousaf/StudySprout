import mongoose from "mongoose";
import Course from "../models/courseModel.js";

export const createCourse = async (req, res) => {
  const course = req.body;

  const newCourse = new Course(course);

  try {
    await newCourse.save();

    res.status(201).json({
      course: newCourse,
    });
  } catch (error) {
    console.error("Error in creating a course", error);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in creating a course" });
  }
};
