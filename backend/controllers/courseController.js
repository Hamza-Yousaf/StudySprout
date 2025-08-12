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

export const getCourses = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const courses = await Course.find({ userId: id });
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error fetching courses" });
  }
};
