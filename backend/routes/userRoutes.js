import express from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

router.get("/:id", getUser);

export default router;
