import mongoose from "mongoose";
import Course from "../models/courseModel.js";

export const createCourse = async (req, res) => {
  const course = req.body;

  if (!course.title || !course.deadline || !course.priority) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

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

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { time } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Course not found" });
  }

  try {
    await Course.findByIdAndUpdate(
      id,
      { $inc: { hoursStudied: time / 3600 } },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Course successfully updated" });
  } catch (error) {
    console.error("Error in updating course", error.message);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in updating a course" });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Course not found" });
  }

  try {
    await Course.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Course successfully deleted" });
  } catch (error) {
    console.error("Error in deleting course", error.message);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in deleting a course" });
  }
};
