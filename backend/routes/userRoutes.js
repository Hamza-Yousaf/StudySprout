import express from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  loginUser,
} from "../controllers/userController.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.use(requireAuth);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

router.get("/:id", getUser);

export default router;
