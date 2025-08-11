import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
