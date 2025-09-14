import mongoose from "mongoose";
import Goal from "../models/goalModel.js";

export const createGoal = async (req, res) => {
  const goal = req.body;

  const newGoal = new Goal(goal);

  try {
    await newGoal.save();

    res.status(201).json({
      goal: newGoal,
    });
  } catch (error) {
    console.error("Error in creating a goal", error);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in creating a goal" });
  }
};

export const getGoals = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const goals = await Goal.find({ userId: id });
    res.status(200).json({ success: true, data: goals });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error fetching goals" });
  }
};

export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const goal = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Goal not found" });
  }

  try {
    await Goal.findByIdAndUpdate(id, goal, { new: true });
    res
      .status(200)
      .json({ success: true, message: "Goal successfully updated" });
  } catch (error) {
    console.error("Error in updating goal", error.message);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in updating a goal" });
  }
};
