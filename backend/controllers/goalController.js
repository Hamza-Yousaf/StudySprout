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
