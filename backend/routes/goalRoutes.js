import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.post("/", createGoal);

router.get("/:id", getGoals);

router.put("/:id", updateGoal);

export default router;
