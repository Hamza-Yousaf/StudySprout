import express from "express";
import {
  createCourse,
  getCourses,
  updateCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/", createCourse);

router.get("/:id", getCourses);

router.put("/:id", updateCourse);

export default router;
